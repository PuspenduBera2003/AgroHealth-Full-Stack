import React from 'react'
import HomePageTyping from './HomePageTyping'
import './Home.css'
import Cover1 from './Cover/Cover1'
import Cover2 from './Cover/Cover2'
import Cover3 from './Cover/Cover3'
import Cover4 from './Cover/Cover4'
import Cover5 from './Cover/Cover5'
import CropFarmings from './Offerings/CropFarmings'
import cropImg from '../../images/crops.jpg'
import CattleFarmings from './Offerings/CattleFarmings'
import NewsLetter from './NewsLetter/NewsLetter'
import { Link, Element } from 'react-scroll';
import TargetedUsers from './TargetedUsers/TargetedUsers'

const Home = () => {
    return (
        <div className='dark:bg-stone-800 py-4'>
            <div className='z-10'>
                <HomePageTyping />
            </div>
            <div className='hidden md:inline m-0.5'>
                <Link
                    to="offerings"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="sticky cursor-pointer top-16 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-300 dark:bg-red-500 rounded-xl group z-20">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-500 dark:bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-stone-400"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-400 dark:bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black dark:text-white transition-colors duration-200 ease-in-out dark:group-hover:text-white">Our Offerings</span>
                </Link>
            </div>

            <Element name="offerings" className='flex items-center justify-center flex-wrap mt-3 md:mt-5 gap-2 md:gap-4'>
                <img src={cropImg} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-30" />
                <CropFarmings />
                <CattleFarmings />
            </Element>

            <div className='hidden md:inline m-0.5'>
                <Link
                    to="objectives"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="sticky cursor-pointer inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-300 dark:bg-red-500 rounded-xl group z-10" style={{ top: '7.5rem' }}>
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white dark:bg-stone-400"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-400 dark:bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-black dark:text-white transition-colors duration-200 ease-in-out dark:group-hover:text-white">Our Objectives</span>
                </Link>
            </div>

            <Element name="objectives" className='w-full mt-3'>
                <Cover1 />
                <Element name="goals">
                    <Cover2 />
                    <Cover3 />
                    <Cover4 />
                    <Cover5 />
                </Element>
            </Element>
            <div className='relative'>
                <TargetedUsers />
            </div>
            <div className='relative'>
                <div className='hidden md:block md:absolute right-0 top-24 m-0.5'>
                    <a href="#_" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group transform rotate-90">
                        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                            <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                            <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                        </span>
                        <span className="relative text-white">NewsLetter</span>
                    </a>

                </div>
                <NewsLetter />
                <div className='text-center flex items-center justify-center text-gray-700 dark:text-gray-300 w-full'>
                    Copyright
                    <i className="fa-regular fa-copyright mx-1"></i>
                    2024, AgroHealth
                </div>
            </div>
        </div>
    )
}

export default Home
