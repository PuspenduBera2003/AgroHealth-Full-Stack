import React from 'react';
import cornBlight from '../../../images/carousel/maize/Corn_Blight.jpg';
import cornCommonrust from '../../../images/carousel/maize/Corn_Common_Rust.jpg';
import cornGrayspot from '../../../images/carousel/maize/Corn_Gray_Spot.jpg';

const maizeDiseases = [
    {
        name: 'Corn Common Rust',
        image: cornCommonrust,
        description: 'Corn Common Rust is a fungal disease causing rust-colored pustules on maize. It spreads through spores in moist, warm conditions.',
        symptoms: ['Yellow-brown lesions and pustules.'],
        prevention: ['Use resistant varieties.', 'Rotate crops and apply fungicides.']
    },
    {
        name: 'Corn Blight',
        image: cornBlight,
        description: 'Corn Blight is a bacterial or fungal disease that causes lesions and wilting of the corn plant. It typically appears in warm, wet conditions and can lead to significant yield loss.',
        symptoms: ['Water-soaked lesions on leaves and stalks.'],
        prevention: ['Implement proper irrigation and avoid waterlogging.', 'Rotate crops and remove infected plants.']
    },
    {
        name: 'Corn Gray Spot',
        image: cornGrayspot,
        description: 'Corn Gray Spot is a fungal disease that causes grayish lesions on the leaves of maize plants. It thrives in humid, warm conditions and can reduce the plant\'s photosynthesis, leading to yield loss.',
        symptoms: ['Gray or brown spots with yellow halos on the leaves.'],
        prevention: ['Apply fungicides during periods of high humidity.', 'Ensure proper plant spacing for air circulation.']
    },
];

const MaizeGrid = () => {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {maizeDiseases.map((disease, index) => (
                <div key={index} className={`flex flex-col bg-gradient-to-r rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl 
                    ${index % 2 === 0 ? 'bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 transition-colors duration-200 ease-in-out' : 
                    'bg-gradient-to-r from-cyan-50 via-white to-cyan-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 transition-colors duration-200 ease-in-out'} 
                    transition-all duration-500 ease-in-out`}>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold text-black dark:text-white bg-opacity-80 bg-gray-300 dark:bg-black p-2 rounded-md transition-colors duration-200 ease-in-out">
                            {disease.name}
                        </div>
                        <img src={disease.image} alt={disease.name} className="w-24 h-24 object-cover rounded-lg" />
                    </div>

                    <div className="mt-4 space-y-4">
                        <p className="text-base text-gray-700 dark:text-white transition-colors duration-200 ease-in-out">{disease.description}</p>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 transition-colors duration-200 ease-in-out">Symptoms</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-100 transition-colors duration-200 ease-in-out">
                                {disease.symptoms.map((symptom, i) => (
                                    <li key={i}>{symptom}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 transition-colors duration-200 ease-in-out">Prevention</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-white transition-colors duration-200 ease-in-out">
                                {disease.prevention.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaizeGrid;