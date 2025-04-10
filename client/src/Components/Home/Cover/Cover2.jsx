import React from 'react'
import coverImg from '../../../images/cover3.jpeg'
import noteSvg from '../../../images/notebook.png'

const Cover2 = () => {
    return (
        <div className='flex p-2 justify-start w-full items-center flex-wrap gap-0 lg:gap-10'>
            <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-cyan-50 via-white to-cyan-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                <div className='flex flex-col flex-wrap'>
                    <div className='font-bold text-3xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2 px-3 mt-2'>
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Subjective
                    </div>
                    <div className='text-black dark:text-gray-50 text-justify max-w-96 md:mr-3 text-xl p-3'>
                        Focusing on the accuracy depending on
                        individual experience to prevent
                        misdiagnosis.
                    </div>
                </div>
                <div className='md:relative flex flex-col items-center justify-center gap-2'>
                    <img src={coverImg} alt="Farmer With a Cow" className='object-cover w-full sm:w-60 sm:h-60 rounded-lg' />
                </div>
            </div>
            <img src={noteSvg} alt="Target" className='hidden lg:block w-48' />
        </div>
    )
}

export default Cover2
