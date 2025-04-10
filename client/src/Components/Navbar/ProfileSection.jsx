import React from 'react'
import { Dropdown, Avatar } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import handleSignOut from '../../api/handleSignOut';
import updateUserDetails from '../../redux/Auth/Actions/userDetails';
import updateIsAuthenticated from '../../redux/Auth/Actions/IsAuthenticated';
import updateSignUpInitialized from '../../redux/Auth/Actions/signUpInitialized';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSection = () => {
    const userDetails = useSelector((state) => state.Auth.userDetails);
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
        <div className="flex md:order-2 items-center justify-center">
            <div className="relative w-full h-full">
            </div>
            <Dropdown
                arrowIcon={false}
                inline
                className="bg-neutral-100 dark:bg-neutral-700 rounded-lg"
                label={
                    userDetails.profile_photo ? (
                        <Avatar
                            alt="User settings"
                            img={userDetails.profile_photo}
                            className="rounded-full ring-2 ring-neutral-300 dark:ring-neutral-500"
                            rounded
                            style={{ width: 40, height: 40 }}
                        />
                    ) : (
                        <div className="flex items-center">
                            <svg
                                className="text-neutral-400 dark:text-neutral-800 rounded-full ring-2 ring-neutral-300 dark:ring-neutral-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ width: 40, height: 40 }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                    )
                }
            >
                <Dropdown.Header className="rounded-t-lg bg-neutral-100 dark:bg-neutral-700">
                    <span className="block text-sm">{userDetails.username}</span>
                    <span className="block truncate text-sm font-medium">{userDetails.email}</span>
                </Dropdown.Header>
                <div className="border-t border-neutral-200 dark:border-neutral-600"></div>
                <Link to="/u/profile">
                    <Dropdown.Item className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600">Profile</Dropdown.Item>
                </Link>
                <Link to="/user/dashboard/all">
                    <Dropdown.Item className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600">All Options</Dropdown.Item>
                </Link>
                <div className="border-t border-neutral-200 dark:border-neutral-600"></div>
                <Dropdown.Item
                    className="bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-b-lg text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 font-bold"
                    onClick={handleSignOutLocal}
                >
                    <div className='flex items-center justify-center gap-1'>
                        <i className="fa-solid fa-power-off"></i>
                        Sign out
                    </div>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default ProfileSection;