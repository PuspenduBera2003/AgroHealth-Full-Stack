import React, { useState } from 'react';
import handleUpload from '../../../../api/handleUpload';
import { Bounce, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateMaizeDetails } from '../../../../redux/Crops/Actions/maizeDetails';
import { uploadMaizeDetails } from '../../../../api/getMaizeDetails';

const FileAPI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [disabled, setDisable] = useState(true);
    const theme = useSelector(state => state.Theme.currentTheme);
    const userDetails = useSelector((state) => state.Auth.userDetails);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Check if the selected file is an image
        if (file && file.type.startsWith('image/')) {
            setDisable(false);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result); // Convert file to base64 URL
            };
            reader.readAsDataURL(file);
        } else {
            setDisable(true); // Disable submit button if file is not an image
            setSelectedImage(null); // Optionally clear the selected image preview
            toast.error('Please select a valid image file', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            toast.error('No file attached', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                transition: Bounce,
            });
            return;
        }

        // Convert base64 to Blob
        const base64Response = await fetch(selectedImage);
        const blob = await base64Response.blob();
        setDisable(true);

        // Convert Blob to File
        const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await handleUpload(file, "predict-maize");
                    if (response.success) {
                        const timestamp = new Date().toISOString();
                        dispatch(updateMaizeDetails(response.image, response.result, timestamp));                        
                        const data = { image: response.image, result: response.result, timestamp: new Date().toISOString() }
                        const uploadData = await uploadMaizeDetails(userDetails.id, data);
                        if (uploadData.success)
                            resolve('Prediction successful!');
                        else {
                            reject(new Error(response.error || 'Prediction failed'));
                        }
                    } else {
                        reject(new Error(response.error || 'Prediction failed.'));
                    }
                } catch (error) {
                    reject(new Error('An unexpected error occurred.'));
                }
            }),
            {
                pending: 'Predicting...',
                success: 'Prediction successful! 🎉',
                error: {
                    render({ data }) {
                        return data.message;
                    },
                },
            }
        );
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm dark:text-gray-400 text-gray-700 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-500 file:text-white
                     hover:file:bg-blue-600"
                />
                {selectedImage && (
                    <div className="rounded-lg overflow-hidden relative">
                        <div className="w-60 h-60 bg-stone-200 dark:bg-stone-700 rounded-lg flex items-center justify-center">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full max-h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className='flex items-center justify-center mt-2 '>
                            <button
                                type="submit"
                                disabled={disabled}
                                className={`px-4 py-2 rounded-lg ${disabled
                                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FileAPI;