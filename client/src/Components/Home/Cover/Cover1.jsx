import React from 'react'
import coverImg from '../../../images/cover8.jpeg'
import targetSvg from '../../../images/target.svg'
import { Link } from 'react-scroll'

const Cover1 = () => {
    return (
        <div className='flex p-2 gap-0 lg:gap-10 justify-end w-full items-center flex-wrap'>
            <img src={targetSvg} alt="Target" className='hidden lg:block w-40' />
            <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                <div className='flex flex-col flex-wrap'>
                    <div className='font-bold text-3xl text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-2 px-3 mt-2'>
                        Our Goals
                    </div>
                    <div className='text-black dark:text-gray-50 text-justify max-w-96 md:mr-3 text-xl p-3'>
                        Traditional methods of crop and cattle disease detection rely heavily on visual inspections by farmers or veterinarians, which can be time-consuming and prone to human error. By incorporating modern technologies like AI, detection can become more accurate, faster, and capable of identifying diseases in earlier stages, improving outcomes for both crops and livestock.
                    </div>
                </div>
                <div className='md:relative flex flex-col items-center justify-center gap-2'>
                    <img src={coverImg} alt="Farmer With a Cow" className='object-cover w-full sm:w-60 sm:h-60 rounded-lg' />
                    <div className='md:absolute bottom-2 left-20'>
                        <Link
                            to="goals"
                            spy={true}
                            smooth={true}
                            offset={50}
                            duration={500}
                            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-down ml-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cover1
