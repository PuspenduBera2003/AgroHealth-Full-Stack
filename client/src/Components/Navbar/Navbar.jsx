import React, { useState } from 'react'
import './Navbar.css'
import NavbarBody from './NavbarBody'
import Switcher from '../../theme/Switcher'
import { useSelector } from 'react-redux'
import logo from '../../images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import ProfileSection from './ProfileSection'

const Navbar = () => {

    const theme = useSelector(state => state.Theme.currentTheme);
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

    return (
        <div className={`py-2 px-3 shadow-lg flex justify-between items-center sticky top-0 z-50 ${theme === 'dark' ? 'navbar-glassy-dark' : 'navbar-glassy-light'}`}>
            <Link to='/' className='flex flex-row cursor-pointer items-center justify-center gap-1'>
                <img src={logo} alt="AgroHealth" className='w-10' />
                <div className='text-2xl font-semibold px-1 text-black dark:text-gray-50'>
                    AgroHealth
                </div>
            </Link>
            <div className='flex flex-row gap-2 items-center md:hidden'>
                <div className="md:hidden">
                    <Switcher />
                </div>

                <div className="md:hidden">
                    <div>
                        <button
                            className="w-14 h-14 relative focus:outline-none bg-teal-400 dark:bg-stone-800 rounded"
                            onClick={() => setOpen(!open)}
                        >
                            <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out ${open ? 'rotate-45' : '-translate-y-1.5'
                                        }`}
                                ></span>
                                <span
                                    className={`block absolute h-0.5 w-5 text-white bg-current transform transition duration-500 ease-in-out ${open ? 'opacity-0' : ''
                                        }`}
                                ></span>
                                <span
                                    className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-500 ease-in-out ${open ? '-rotate-45' : 'translate-y-1.5'
                                        }`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`md:hidden ${open ? 'block absolute left-0' : 'hidden'} transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-neutral-600' : 'bg-white'} w-full shadow-lg`}
                style={{ top: '75px' }}
            >
                <Link to='/' className={`block text-black dark:text-white px-4 py-2  ${pathname === '/' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                    Home
                </Link>
                <Link to='/about' className={`block text-black dark:text-white px-4 py-2  ${pathname === '/about' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                    About
                </Link>
                <Link to='/contact' className={`block text-black dark:text-white px-4 py-2  ${pathname === '/contact' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                    Contact
                </Link>
                {
                    isAuthenticated ?
                        <Link to='/u/profile'  className={`block text-black dark:text-white px-4 py-2  ${pathname === '/u/profile' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                            View Profile
                        </Link>
                        :
                        <div>
                            <Link to='/auth/signin' className={`block text-black dark:text-white px-4 py-2  ${pathname === '/auth/signin' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                                Sign In
                            </Link>
                            <Link to='/auth/signup' className={`block text-black dark:text-white px-4 py-2  ${pathname === '/auth/signup' ? 'from-pink-300 via-white to-white dark:from-pink-600 dark:via-neutral-600 dark:to-neutral-600 bg-gradient-to-r' : ''}`}>
                                Sign Up
                            </Link>
                        </div>
                }
            </div>

            <div className='hidden md:block'>
                <NavbarBody />
            </div>

            <div className='hidden md:flex items-center justify-center gap-2'>
                <div className='mx-1'>
                    <Switcher />
                </div>
                {
                    isAuthenticated ? (
                        <ProfileSection />
                    ) : (
                        <div className='flex flex-row gap-2'>
                            <Link to='/auth/signin' className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign In
                            </Link>
                            <Link to='/auth/signup' className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Sign Up
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar