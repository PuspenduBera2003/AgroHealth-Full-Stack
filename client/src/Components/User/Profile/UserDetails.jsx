import React from 'react'
import UploadProfilePhoto from './UploadProfilePhoto'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import handleSignOut from '../../../api/handleSignOut';
import updateSignUpInitialized from '../../../redux/Auth/Actions/signUpInitialized';
import updateIsAuthenticated from '../../../redux/Auth/Actions/IsAuthenticated';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';
import { toast } from 'react-toastify';

const UserDetails = () => {

    const userDetails = useSelector(state => state.Auth.userDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector(state => state.Theme.currentTheme);

    const handleSignOutLocal = async () => {
        const signOutPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await handleSignOut();
                if (response.success) {
                    resolve('Signed out successfully!');
                    dispatch(updateSignUpInitialized({
                        start: false,
                        response: { success: false, serverReplied: false },
                        email: '',
                        password: '',
                        username: '',
                        token: ''
                    }));
                    dispatch(updateUserDetails(null));
                    localStorage.setItem('isAuthenticated', false);
                    dispatch(updateIsAuthenticated(false));
                    navigate('/auth/signin');
                } else {
                    reject(new Error(response.error || 'Failed to sign out. Please try again.'));
                }
            } catch (error) {
                reject(new Error('An unexpected error occurred. Please try again.'));
            }
        });

        toast.promise(signOutPromise, {
            pending: 'Signing you out...',
            success: 'Signed out successfully! 🎉',
            error: { render({ data }) { return data.message; } },
        }, { position: 'bottom-right', theme });
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            {
                !userDetails.profile_photo ?
                    <div className='w-full flex items-center justify-center flex-col mb-3'>
                        <div className='dark:text-white text-2xl font-semibold p-4 text-center transition-colors duration-200 ease-in-out' style={{ width: '70%' }}>
                            Add a profile picture to beautify your profile.
                        </div>
                        <UploadProfilePhoto buttonName="Upload Profile Photo" />
                    </div>
                    :
                    <div className='w-full flex items-center justify-center flex-col mb-3'>
                        <img className="w-40 h-40 rounded-full mb-3" src={userDetails.profile_photo} alt={userDetails.username}></img>
                        <UploadProfilePhoto buttonName="Update Profile Photo" />
                    </div>
            }
            <form className="mx-auto mt-0">
                <div className='flex items-center justify-center gap-1 w-48 md:w-96 flex-col'>
                    <label htmlFor="username" className='p-2 text-gray-900 dark:text-gray-100 font-bold transition-colors duration-200 ease-in-out'>
                        Username
                    </label>
                    <input type="text" id="username" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200 ease-in-out" value={userDetails.username} disabled />
                </div>
                <div className='flex items-center justify-center gap-1 w-48 md:w-96 flex-col'>
                    <label htmlFor="email" className='p-2 text-gray-900 dark:text-gray-100 font-bold transition-colors duration-200 ease-in-out'>
                        Email
                    </label>
                    <input type="text" id="email" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-neutral-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200 ease-in-out" value={userDetails.email} disabled readOnly />
                </div>
            </form>
            <button
                onClick={handleSignOutLocal}
                type="button"
                className="mt-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center gap-1 transition-colors duration-200 ease-in-out">
                <i className="fa-solid fa-power-off"></i>
                Sign Out
            </button>
        </div>
    )
}

export default UserDetails
