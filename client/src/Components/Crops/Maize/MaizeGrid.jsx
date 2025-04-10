import React from 'react'
import cornBlight from '../../../images/carousel/maize/Corn_Blight.jpg'
import cornCommonrust from '../../../images/carousel/maize/Corn_Common_Rust.jpg'
import cornGrayspot from '../../../images/carousel/maize/Corn_Gray_Spot.jpg'

const MaizeGrid = () => {
    return (
        <div className=''>
            <div className='w-full flex justify-end p-2'>
                <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                    <div className='m-2'>
                        <div className="text-black dark:text-white my-1 p-2 bg-gray-300 dark:bg-black bg-opacity-50 dark:bg-opacity-50 rounded-md font-bold text-lg">
                            Corn Common Rust
                        </div>
                        <div className="space-y-4">
                            <p className="text-base text-gray-700 dark:text-white">
                                Corn Common Rust is a fungal disease causing rust-colored pustules on maize. It spreads through spores in moist, warm conditions.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Symptoms</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-100">
                                <li>Yellow-brown lesions and pustules.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Prevention</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-white">
                                <li>Use resistant varieties.</li>
                                <li>Rotate crops and apply fungicides.</li>
                            </ul>
                        </div>

                    </div>
                    <img src={cornCommonrust} alt="Corn Blight" className='object-cover w-full sm:w-72 sm:h-72 rounded-lg' />
                </div>
            </div>
            <div className='w-full flex p-2'>
                <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-cyan-50 via-white to-cyan-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                    <div className='m-2' style={{ maxWidth: '50rem' }}>
                        <div className="text-black dark:text-white my-1 p-2 bg-gray-300 dark:bg-black bg-opacity-50 dark:bg-opacity-50 rounded-md font-bold text-lg">
                            Corn Blight
                        </div>
                        <div className="space-y-4">
                            <p className="text-base text-gray-700 dark:text-white">
                                Corn Blight is a bacterial or fungal disease that causes lesions and wilting of the corn plant. It typically appears in warm, wet conditions and can lead to significant yield loss.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Symptoms</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-100">
                                <li>Water-soaked lesions on leaves and stalks.</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Prevention</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-white">
                                <li>Implement proper irrigation and avoid waterlogging.</li>
                                <li>Rotate crops and remove infected plants.</li>
                            </ul>
                        </div>
                    </div>
                    <img src={cornBlight} alt="Corn Blight" className='object-cover w-full sm:w-72 sm:h-72 rounded-lg' />
                </div>
            </div>
            <div className='w-full flex justify-end p-2'>
                <div className='flex flex-wrap items-center justify-center gap-3 md:gap-10 rounded-lg bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:bg-transparent p-2 shadow-lg border-gray-600 dark:border'>
                    <div className='m-2' style={{ maxWidth: '50rem' }}>
                        <div className="text-black dark:text-white my-1 p-2 bg-gray-300 dark:bg-black bg-opacity-50 dark:bg-opacity-50 rounded-md font-bold text-lg">
                            Corn Gray Spot
                        </div>
                        <div className="space-y-4">
                            <p className="text-base text-gray-700 dark:text-white">
                                Corn Gray Spot is a fungal disease that causes grayish lesions on the leaves of maize plants. It thrives in humid, warm conditions and can reduce the plant's photosynthesis, leading to yield loss.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Symptoms</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-100">
                                <li>Gray or brown spots with yellow halos on the leaves.</li>
                            </ul>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">Prevention</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-white">
                                <li>Apply fungicides during periods of high humidity.</li>
                                <li>Ensure proper plant spacing for air circulation.</li>
                            </ul>
                        </div>
                    </div>
                    <img src={cornGrayspot} alt="Corn Blight" className='object-cover w-full sm:w-72 sm:h-72 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default MaizeGrid
