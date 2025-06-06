const express = require("express");
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require("firebase/storage");
const config = require("../../config/firebaseConfig.js");
const sharp = require("sharp");
const router = express.Router();
const db = require("../../database.js");

// Initialize Firebase
initializeApp(config.firebaseConfig);
const storageMulter = getStorage();

// Configure Multer with memoryStorage
const upload = multer({
    storage: multer.memoryStorage(), // Use memoryStorage to access buffer directly
});

router.post("/predict-tomato", upload.single('image'), async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
          return res.status(401).json({ success: false, error: "User is not authenticated" });
        }

        // Update the user's upload count or prime status in the database
        const updatedUser = await db.query(
          'SELECT * FROM users WHERE id = $1',
          [req.user.id]  // Pass the user ID to fetch the latest data
        );

        if (!updatedUser.rows.length) {
          return res.status(404).json({ success: false, error: "User not found" });
        }

        // Update req.user with the new user data
        req.user = updatedUser.rows[0];  // Set updated user data to req.user

        // Optionally, update the session (if using session-based auth)
        req.session.passport.user = req.user;  // Update session with the latest user data

        // if (!req.user.prime && req.user.uploadcount >= 5) {
        //   return res.status(403).json({ success: false, error: "Upload limit exceeded" });
        // }

        if (!req.file) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }

        // Compress the uploaded image using Sharp
        const compressedImage = await sharp(req.file.buffer) // Access buffer directly
            .resize({ width: 200, height: 200 }) // Resize the image
            .toBuffer(); // Convert to buffer

        // Save the compressed image to a temporary file
        const tempDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir); // Create the uploads directory if it doesn't exist
        }
        const tempFilePath = path.join(tempDir, `temp_${Date.now()}.jpg`);
        fs.writeFileSync(tempFilePath, compressedImage); // Write compressed image to disk

        // Generate a unique filename for Firebase Storage
        const dateTime = new Date().toISOString();
        const firebaseFilePath = `files/${req.file.originalname}_${dateTime}`;
        const storageRef = ref(storageMulter, firebaseFilePath);

        // Metadata for Firebase Storage
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload compressed image to Firebase
        const snapshot = await uploadBytesResumable(storageRef, compressedImage, metadata);

        // Get the public download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Predict the maize disease using the Python script
        const filePath = "D:\\AgroHealth\\model\\Tomato\\test_tomato.py";
        const command = `python ${filePath} ${tempFilePath}`; // Pass the correct temp file path

        exec(command, { cwd: "D:\\AgroHealth\\model\\Tomato" }, async (error, stdout, stderr) => {
            // Clean up the temporary file after script execution
            fs.unlinkSync(tempFilePath);

            if (error) {
                console.error(`Error: ${stderr}`);

                // Delete the uploaded file from Firebase
                try {
                    await deleteObject(storageRef);
                    console.log("Uploaded file deleted from Firebase.");
                } catch (deleteError) {
                    console.error("Error deleting file from Firebase:", deleteError.message);
                }

                return res.status(500).json({ success: false, error: "Prediction failed" });
            }

            // Process and clean Python script output
            const cleanedOutput = stdout.toString().trim();

            res.json({ success: true, result: cleanedOutput, image: downloadURL });
        });
    } catch (err) {
        console.error(err);

        // Delete the uploaded file from Firebase if an error occurs before exec
        if (storageRef) {
            try {
                await deleteObject(storageRef);
                console.log("Uploaded file deleted from Firebase.");
            } catch (deleteError) {
                console.error("Error deleting file from Firebase:", deleteError.message);
            }
        }

        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
