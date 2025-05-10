import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteTomatoDetails } from '../../../api/getTomatoDetails';
import { useDispatch } from 'react-redux';
import { removeTomatoDetails } from '../../../redux/Crops/Actions/deleteTomatoDetails';

const DeleteConfirmation = ({ setModalOpen, image }) => {
    const [visible, setVisible] = useState(false); // Start hidden
    const dispatch = useDispatch();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true); // Trigger entry animation
        }, 10); // Short delay to allow DOM mount before transition

        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setVisible(false); // Trigger exit
        setTimeout(() => setModalOpen(false), 300); // Match duration
    };

    const doDelete = () => {
        handleClose();
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const response = await deleteTomatoDetails(image);
                    if (response.success) {
                        dispatch(removeTomatoDetails(image));
                        resolve('Deleted Successfully!');
                    } else {
                        reject(new Error(response.error || 'Failed to Delete.'));
                    }
                } catch (error) {
                    reject(new Error('An unexpected error occurred.'));
                }
            }),
            {
                pending: 'Deleting the search...',
                success: 'Deleted successfully! 🎉',
                error: {
                    render({ data }) {
                        return data.message;
                    },
                },
            }
        );
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center w-full z-10">
            <div
                className={`
                    bg-stone-200 dark:bg-stone-700 text-black dark:text-white px-5 py-2 rounded-lg
                    flex flex-col items-center justify-center gap-1 md:gap-2 lg:gap-3
                    transition-all duration-300 transform
                    ${visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
                `}
            >
                <div>Do you want to delete this search?</div>
                <div className='flex flex-row gap-1 md:gap-2 flex-wrap'>
                    <button
                        type="button"
                        onClick={doDelete}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;