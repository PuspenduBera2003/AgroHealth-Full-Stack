import React from 'react'
import cattleImg from '../../../images/cattle.jpg'
import murrah from '../../../images/murrah.jpeg'
import surti from '../../../images/surti.jpg'
import jaffarabadi from '../../../images/jaffarabadi.jpg'
import bhadawari from '../../../images/bhadawari.jpg'

const CattleFarmings = () => {
  return (
    <div className='relative md:h-screen bg-gradient-to-br flex items-center justify-center'>
    {/* Background Image */}

    {/* Glassy Card */}
    <div className='relative z-10 flex flex-col gap-1 items-center justify-center flex-wrap bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-3xl p-5 md:p-6'>
        <div className='flex flex-wrap items-center justify-center flex-col gap-2'>
            <div className='dark:text-white text-xl font-semibold'>
                Cattle Farming
            </div>
            <img src={cattleImg} alt="Images of Crop" className='object-cover w-full sm:w-60 sm:h-60 rounded-lg cursor-pointer hover:opacity-70 transition-opacity ease-in-out' />
        </div>
        <div className='my-3 flex flex-row gap-3 items-center justify-center'>
            <div className='flex flex-col gap-1 dark:text-gray-50 items-center justify-center'>
                <img src={murrah} alt="Infected rice" className='w-24 rounded-lg cursor-pointer hover:opacity-70 transition-opacity ease-in-out' />
                Murrah
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-50 items-center justify-center '>
                <img src={surti} alt="Infected corn" className='w-24 rounded-lg cursor-pointer hover:opacity-70 transition-opacity ease-in-out' />
                Surti
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-50 items-center justify-center'>
                <img src={jaffarabadi} alt="Infected wheat" className='w-24 rounded-lg cursor-pointer hover:opacity-70 transition-opacity ease-in-out' />
                Jaffarabadi
            </div>
            <div className='flex flex-col gap-1 dark:text-gray-50 items-center justify-center'>
                <img src={bhadawari} alt="Infected tomato" className='w-24 rounded-lg cursor-pointer hover:opacity-70 transition-opacity ease-in-out' />
                Bhadawari
            </div>
        </div>
        <a href="#_" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white">Explore</span>
        </a>
    </div>
</div>
  )
}

export default CattleFarmings
