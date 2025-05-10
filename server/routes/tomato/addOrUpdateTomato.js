const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../../database.js");

router.post('/tomato-data/:id', async (req, res) => {
    const { id } = req.params;  // Extract user_id from URL parameter
    const { tomato_details } = req.body;  // Extract tomato_details from the request body
    try {
        // First, check if there's existing data for the given user_id
        const result = await db.query(
            'SELECT * FROM tomato_data WHERE user_id = $1',
            [id]
        );

        let tomatoDataResult;

        if (result.rows.length > 0) {
            // If the data already exists, we need to append new tomato_details

            // Retrieve the existing tomato_details (which is an array of objects)
            const existingTomatoDetails = result.rows[0].tomato_details;

            // Append the new tomato_details to the existing array
            const updatedTomatoDetails = [
                tomato_details,          // Append the new tomato_details
                ...existingTomatoDetails   // Keep the old tomato_details
            ];

            // Update the record with the new tomato_details
            const updateResult = await db.query(
                'UPDATE tomato_data SET tomato_details = $1 WHERE user_id = $2 RETURNING *',
                [updatedTomatoDetails, id]
            );
            tomatoDataResult = updateResult;
        } else {
            // If no data exists for the user, insert a new record with the tomato_details as an array
            const insertResult = await db.query(
                'INSERT INTO tomato_data (user_id, tomato_details) VALUES ($1, $2) RETURNING *',
                [id, [tomato_details]]
            );
            tomatoDataResult = insertResult;
        }

        // Now, update the uploadCount in the users table
        const updateUploadCount = await db.query(
            'UPDATE users SET uploadCount = uploadCount + 1 WHERE id = $1 RETURNING *',
            [id]  // Increment the uploadCount by 1
        );

        if (updateUploadCount.rows.length > 0) {
            // Send the success response
            res.status(200).json({
                success: true,
                data: tomatoDataResult.rows[0].tomato_details, // Return the tomato data record
                uploadCount: updateUploadCount.rows[0].uploadCount // Return the updated uploadCount
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to update upload count'
            });
        }
    } catch (err) {
        console.error('Error updating or inserting data:', err);
        res.status(500).json({ success: false, error: err });
    }
});

router.get("/get-tomato-data", async (req, res) => {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, error: "user is not authenticated" });
    const id = user.id;
    try {
        const result = await db.query(
            'SELECT * FROM tomato_data WHERE user_id = $1',
            [id]
        );
        if (!result.rows[0]) return res.status(200).json({ success: true, data: {} });
        return res.status(200).json({ success: true, data: result.rows[0].tomato_details });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, error });
    }
})

router.delete("/delete-tomato-data", async (req, res) => {
    const { image } = req.body;
    const user = req.user;

    if (!user) {
        return res.status(401).json({ success: false, error: "User is not authenticated" });
    }

    const id = user.id;

    if (!image) {
        return res.status(400).json({ success: false, error: "Image key is required" });
    }

    try {
        const query = `
            UPDATE tomato_data
            SET tomato_details = COALESCE((
                SELECT array_agg(elem)
                FROM (
                    SELECT elem
                    FROM unnest(tomato_details) AS elem
                    WHERE (elem::jsonb)->>'image' IS DISTINCT FROM $2
                ) AS filtered
            ), '{}')
            WHERE user_id = $1
        `;

        await db.query(query, [id, image]);
        await axios.delete(`${image}`);
        return res.status(200).json({ success: true, message: "Tomato detail deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || "Internal server errors" });
    }
});

module.exports = router;