import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import handleUpload from '../../../../api/handleUpload';
import { Bounce, toast } from 'react-toastify';
import { updateMaizeDetails } from '../../../../redux/Crops/Actions/maizeDetails';
import { useDispatch, useSelector } from 'react-redux';
import { uploadMaizeDetails } from '../../../../api/getMaizeDetails';

const CameraAPI = () => {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [isWaitingForPermission, setIsWaitingForPermission] = useState(false);
    const [permissionToastId, setPermissionToastId] = useState(null);
    const theme = useSelector(state => state.Theme.currentTheme);
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.Auth.userDetails);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setScreenshot(imageSrc);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!screenshot) {
            toast.error('No file attached', {
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
            return;
        }

        const base64Response = await fetch(screenshot);
        const blob = await base64Response.blob();
        const file = new File([blob], "captured_image.jpg", { type: "image/jpeg" });

        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await handleUpload(file, "predict-maize");
                    if (response.success) {
                        const timestamp = new Date().toISOString();
                        dispatch(updateMaizeDetails(response.image, response.result, timestamp));
                        const data = { image: response.image, result: response.result, timestamp };
                        const uploadData = await uploadMaizeDetails(userDetails.id, data);
                        if (uploadData.success) {
                            resolve('Prediction successful!');
                        } else {
                            reject(new Error(response.error || 'Prediction failed'));
                        }
                        setScreenshot(null);
                        setIsCameraActive(false);
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
        <div
            className="w-60 h-60 bg-stone-200 dark:bg-stone-700 rounded-lg flex flex-col gap-2 items-center justify-center cursor-pointer"
            onClick={() => {
                if (!isCameraActive) {
                    setIsCameraActive(true);
                    const id = toast.loading("Waiting for camera permission...", {
                        position: "bottom-right",
                        theme: theme,
                    });
                    setPermissionToastId(id);
                    setIsWaitingForPermission(true);
                }
            }}
        >
            <div className={isCameraActive ? 'hidden' : 'flex items-center justify-center flex-col gap-2'}>
                <i className="fa-solid fa-camera text-6xl text-gray-700 dark:text-stone-900"></i>
                <div className="text-gray-800 dark:text-gray-100">
                    {isCameraActive ? "Camera is on" : "Use your camera"}
                </div>
            </div>

            {!screenshot && isCameraActive && (
                <div className="rounded-lg w-full h-full">
                    <div className="w-full h-full bg-black rounded-lg relative">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            className="rounded-lg w-60 h-60"
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                facingMode: "environment",
                            }}
                            onUserMedia={() => {
                                setIsWaitingForPermission(false);
                                if (permissionToastId) toast.dismiss(permissionToastId);
                            }}
                            onUserMediaError={() => {
                                setIsWaitingForPermission(false);
                                if (permissionToastId) toast.dismiss(permissionToastId);
                                toast.error('Camera permission denied', {
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
                            }}
                        />
                        <div className="w-full flex items-center justify-center absolute bottom-8 gap-2 z-10">
                            <button
                                className="p-2 bg-green-500 text-white rounded-md"
                                onClick={capture}
                            >
                                Capture
                            </button>
                            <button
                                className="p-2 bg-red-500 text-white rounded-md"
                                onClick={() => {
                                    setIsCameraActive(false);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {screenshot && (
                <div className="w-60 h-60 flex items-center justify-center rounded-lg relative">
                    <img src={screenshot} alt="Captured" className="w-full max-h-full" />
                    <div className='flex items-center justify-center absolute bottom-2.5 gap-2'>
                        <button
                            className="p-2 bg-green-500 text-white rounded-full w-10 h-10"
                            onClick={handleSubmit}
                        >
                            <i className="fa-solid fa-check"></i>
                        </button>
                        <button
                            className="p-2 bg-blue-500 text-white w-10 h-10 rounded-full"
                            onClick={() => {
                                setIsCameraActive(true);
                                setScreenshot(null);
                            }}
                        >
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                        <button
                            className="p-2 bg-red-500 text-white w-10 h-10 rounded-full"
                            onClick={() => {
                                setIsCameraActive(false);
                                setScreenshot(null);
                            }}
                        >
                            <i className="fa-solid fa-x"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraAPI;