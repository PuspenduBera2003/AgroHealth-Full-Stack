import React from 'react'
import coverImg from '../../../images/cover6.jpeg'
import clockSvg from '../../../images/time.svg'

const Cover3 = () => {
    return (
        <div className='flex p-2 gap-0 lg:gap-10 justify-end w-full items-center flex-wrap'>
            <img src={clockSvg} alt="Target" className='hidden lg:block w-40' />
            <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                <div className='flex flex-col flex-wrap'>
                    <div className='font-bold text-3xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2 px-3 mt-2'>
                        <i className="fa-solid fa-clock mr-2"></i>
                        Time Consumption
                    </div>
                    <div className='text-black dark:text-gray-50 text-justify max-w-96 md:mr-3 text-xl p-3'>
                        Preventing delay in treatment with
                        Regular field visits and lab analysis
                    </div>
                </div>
                <div className='md:relative flex flex-col items-center justify-center gap-2'>
                    <img src={coverImg} alt="Farmer With a Cow" className='object-cover w-full sm:w-60 sm:h-60 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default Cover3
