import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import handleUploadImage from '../../../api/handleUploadImage'
import updateUserDetails from "../../../redux/Auth/Actions/userDetails";
import { Slider } from "@mui/material";
import { Bounce, toast } from "react-toastify";

const EasyCrop = (props) => {
    const { image, setDrawerOpen } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const theme = useSelector(state => state.Theme.currentTheme);

    const userDetails = useSelector(state => state.Auth.userDetails)

    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImageResult = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            );
            if (croppedImageResult) {
                setCroppedImage(croppedImageResult);
            } else {
                console.error('getCroppedImg returned undefined');
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, image]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    const onSubmit = async () => {
        try {
            if (!croppedImage) {
                return;
            }

            setDrawerOpen({ 'bottom': false });

            // Convert the base64 data of the cropped image to a Blob
            const blob = await fetch(croppedImage).then((res) => res.blob());

            // Create a File object with a specific filename and type
            const file = new File([blob], `${userDetails.username}.jpg`, { type: blob.type });

            const deleteImagePromise = new Promise(async (resolve, reject) => {
                try {
                    const response = await handleUploadImage(file);
                    if (response.success) {
                        dispatch(updateUserDetails(response.user));
                        resolve('Image deleted successfully!');
                    } else {
                        reject(new Error(response.error || 'Failed to update image. Please try again.'));
                    }
                } catch (error) {
                    reject(new Error('An unexpected error occurred. Please try again.'));
                }
            });

            toast.promise(deleteImagePromise, {
                pending: 'Updating image...',
                success: 'Image upldated successfully! 🎉',
                error: { render({ data }) { return data.message; } },
            }, { position: 'bottom-right', theme });
        } catch (error) {
            toast.error('An unknown error occurred', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };



    return (
        <div>
            <button
                style={{
                    display: image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={showCroppedImage}
                className="absolute bottom-2 right-2 z-50 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-colors duration-200 ease-in-out"
            >
                Save Changes
            </button>
            <div
                className="container"
                style={{
                    display: image === null || croppedImage !== null ? "none" : "block",
                }}
            >
                <div className="crop-container bg-gray-50 dark:bg-gray-600 transition-colors duration-200 ease-in-out">
                    <Cropper
                        image={image}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        zoomSpeed={4}
                        maxZoom={3}
                        zoomWithScroll={true}
                        showGrid={true}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </div>
                <div className="absolute right-6 top-1">
                    <label>
                        Rotate
                        <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="rotate"
                            onChange={(e, rotation) => setRotation(rotation)}
                            className="range"
                        />
                    </label>
                    <label>
                        Zoom
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="zoom"
                            onChange={(e, zoom) => setZoom(zoom)}
                            className="range"
                        />
                    </label>
                </div>
            </div>
            <div className="flex justify-center items-center">
                {croppedImage && (
                    <img className="cropped-image w-60 h-60" src={croppedImage} alt="cropped" />
                )}
                {croppedImage &&
                    <>
                        <button onClick={onClose} className="absolute top-2 right-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-colors duration-200 ease-in-out">
                            Update
                        </button>
                        <button onClick={onSubmit} className="absolute bottom-2 right-2 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 transition-colors duration-200 ease-in-out">
                            Upload
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default EasyCrop;