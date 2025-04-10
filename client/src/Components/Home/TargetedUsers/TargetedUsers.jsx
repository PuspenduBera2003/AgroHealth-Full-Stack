import React from 'react'
import targetedUser from '../../../images/targeted-user.png'

const TargetedUsers = () => {
    return (
        <div className='p-2 flex items-center justify-around flex-wrap gap-5'>
            <div className='flex flex-col'>
                <div className='text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-3xl font-semibold'>
                    Targeted Users
                </div>
                <img src={targetedUser} alt="Targeted User" className='w-48' />
            </div>
            <div className='flex flex-col gap-5'>
                <div className="rounded-lg">
                    <span className="text-blue-800 dark:text-white p-2 rounded-md bg-neutral-200 dark:bg-neutral-700">90-150 Million</span>
                    <span className="text-black dark:text-white ml-5">Total Farmers in India</span>
                </div>
                <div className="rounded-lg">
                    <span className="text-blue-800 dark:text-white p-2 rounded-md bg-neutral-200 dark:bg-neutral-700">30 Million</span>
                    <span className="text-black dark:text-white ml-5">Farmers Using Smartphone</span>
                </div>
                <div className="rounded-lg">
                    <span className="text-blue-800 dark:text-white p-2 rounded-md bg-neutral-200 dark:bg-neutral-700">25 Billion</span>
                    <span className="text-black dark:text-white ml-5">AgroHealth Market Size by 2025</span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className='flex flex-col gap-2 from-indigo-50 via-white to-indigo-100 dark:from-stone-800 shadow-md dark:to-stone-900 dark:border border-gray-600 bg-gradient-to-r items-center justify-start p-2 rounded-md'>
                    <div className='flex flex-row gap-2 items-end'>
                        <div className='bg-blue-600 h-32 rounded-sm w-5'></div>
                        <div className='bg-cyan-500 h-5 rounded-sm w-5'></div>
                        <div className='bg-gray-300 dark:bg-neutral-700 h-2 rounded-sm w-5'></div>
                    </div>
                    <div className="flex flex-col justify-center sm:justify-end items-start gap-y-2">
                        <div className="inline-flex items-center">
                            <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
                            <span className="text-[13px] text-gray-900 dark:text-gray-50">
                                AgroHealth Market Size By 2025
                            </span>
                        </div>
                        <div className="inline-flex items-center">
                            <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
                            <span className="text-[13px] text-gray-900 dark:text-gray-50">
                                Total Farmers in India
                            </span>
                        </div>
                        <div className="inline-flex items-center">
                            <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
                            <span className="text-[13px] text-gray-900 dark:text-gray-50">
                                Farmers Using Smartphone
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TargetedUsers
