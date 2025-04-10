import React, { useCallback, useState } from 'react'
import { FileInput, Label } from 'flowbite-react';
import { useDropzone } from 'react-dropzone';
import CropImage from './CropImage';
import handleDeleteImage from '../../../api/handleDeleteImage';
import { useDispatch, useSelector } from 'react-redux';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';
import { Drawer } from '@mui/material';
import { toast } from 'react-toastify';

const UploadProfilePhoto = ({ buttonName }) => {

    const [uploadedFile, setUploadedFile] = useState(null);
    const userDetails = useSelector(state => state.Auth.userDetails);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.Theme.currentTheme);

    const [drawerOpen, setDrawerOpen] = useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setUploadedFile(false)
        setDrawerOpen({ [anchor]: open });
    };

    const onDrop = useCallback(acceptedFiles => {
        const image = acceptedFiles[0];
        setUploadedFile(URL.createObjectURL(image));// Open the modal after uploading the file
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: ['image/jpeg', 'image/png', 'image/svg', 'image/gif'],
        onDrop, // This is where you should use the onDrop function
        maxFiles: 1,
    });

    const handleDelete = async () => {
        const deleteImagePromise = new Promise(async (resolve, reject) => {
            try {
                const response = await handleDeleteImage();
                if (response.success) {
                    dispatch(updateUserDetails(response.user));
                    resolve('Image deleted successfully!');
                } else {
                    dispatch(updateUserDetails(response.user));
                    reject(new Error(response.error || 'Failed to delete image. Please try again.'));
                }
            } catch (error) {
                reject(new Error('An unexpected error occurred. Please try again.'));
            }
        });

        toast.promise(deleteImagePromise, {
            pending: 'Deleting image...',
            success: 'Image deleted successfully! 🎉',
            error: { render({ data }) { return data.message; } },
        }, { position: 'bottom-right', theme });
    }

    return (
        <div>
            <div className='flex flex-wrap items-center justify-center gap-2 m-2'>
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-neutral-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400" onClick={toggleDrawer('bottom', true)}>
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0">
                        {buttonName}
                    </span>
                </button>
                {
                    userDetails.profile_photo &&
                    <button
                        onClick={handleDelete}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-neutral-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0">
                            <i className="fa-regular fa-trash-can" style={{ fontSize: '1.2rem' }}></i>
                        </span>
                    </button>
                }
            </div>
            <Drawer
                anchor="bottom"
                open={drawerOpen.bottom}
                onClose={toggleDrawer('bottom', false)}
                className='overflow-hidden'
            >
                <div className='w-full h-full flex items-center justify-center'>
                    <div className="flex items-center justify-center w-full">
                        <Label
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                            <div className="flex flex-col items-center justify-center">
                                {
                                    uploadedFile ? (
                                        <CropImage image={uploadedFile} setDrawerOpen={setDrawerOpen} />
                                    ) :
                                        <div className='flex flex-col items-center justify-center'>
                                            <svg
                                                className="mb-4 h-8 w-8 text-neutral-500 dark:text-neutral-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            <FileInput id="dropzone-file" className="hidden" {...getInputProps()} />
                                        </div>}
                            </div>
                        </Label>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default UploadProfilePhoto
