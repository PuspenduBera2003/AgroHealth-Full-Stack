import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavbarBody = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className='hidden md:flex flex-row gap-5 font-semibold'>
            <Link to='/' className={`transition-all duration-200 ease-in-out p-2 rounded-lg text-black from-violet-50 via-violet-200 to-violet-300 dark:from-stone-500 dark:via-stone-600 dark:to-stone-700 hover:bg-gradient-to-br cursor-pointer dark:text-gray-50 uppercase text-sm ${currentPath === '/' ? 'from-violet-50 via-violet-200 to-violet-300 dark:from-stone-500 dark:via-stone-600 dark:to-stone-700 bg-gradient-to-r' : ''}`}>
                Home
            </Link>
            <div className='p-2 rounded-lg text-black from-violet-50 via-violet-200 to-violet-300 dark:from-stone-500 dark:via-stone-600 dark:to-stone-700 hover:bg-gradient-to-br cursor-pointer dark:text-gray-50 uppercase text-sm'>
                About
            </div>
            <div className='p-2 rounded-lg text-black from-violet-50 via-violet-200 to-violet-300 dark:from-stone-500 dark:via-stone-600 dark:to-stone-700 hover:bg-gradient-to-br cursor-pointer dark:text-gray-50 uppercase text-sm'>
                Contact Us
            </div>
            <div className='premium-button'>
                <div className='text-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 font-medium rounded-lg text-sm text-center p-2 cursor-pointer'>
                    Get Premium
                </div>
            </div>
        </div>
    )
}

export default NavbarBody
