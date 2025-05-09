import React from 'react';
import bacterialSpot from '../../../images/carousel/tomato/Bacterial_Spot.JPG';
import earlyBlight from '../../../images/carousel/tomato/Early_Blight.JPG';
import lateBlight from '../../../images/carousel/tomato/Late_Blight.JPG';
import leafMold from '../../../images/carousel/tomato/Leaf_Mold.JPG';
import septoriaSpot from '../../../images/carousel/tomato/Septoria_Leaf_Spot.JPG';
import spiderMites from '../../../images/carousel/tomato/Spider_Mites.JPG';
import targetSpot from '../../../images/carousel/tomato/Target_Spot.JPG';
import yellowLeafCurl from '../../../images/carousel/tomato/Yellow_Leaf_Curl_Virus.JPG';
import mosaicVirus from '../../../images/carousel/tomato/Mosaic_Virus.JPG';

const tomatoDiseases = [
    {
        name: 'Bacterial Spot',
        image: bacterialSpot,
        description: 'Bacterial Spot is caused by Xanthomonas bacteria. It leads to dark lesions on leaves and fruits, reducing market quality.',
        symptoms: ['Dark, water-soaked spots on leaves and fruits.'],
        prevention: ['Use certified disease-free seeds.', 'Apply copper-based bactericides.']
    },
    {
        name: 'Early Blight',
        image: earlyBlight,
        description: 'Early Blight is a fungal disease that causes concentric rings on leaves and fruit drop.',
        symptoms: ['Dark spots with concentric rings on lower leaves.'],
        prevention: ['Use crop rotation and resistant varieties.', 'Apply fungicides regularly.']
    },
    {
        name: 'Late Blight',
        image: lateBlight,
        description: 'Late Blight is a serious fungal disease causing dark lesions and plant collapse in humid conditions.',
        symptoms: ['Large, irregular dark spots with white mold underneath.'],
        prevention: ['Apply systemic fungicides.', 'Destroy infected plant debris.']
    },
    {
        name: 'Leaf Mold',
        image: leafMold,
        description: 'Leaf Mold appears as yellow spots on the upper side and mold underneath, caused by Fulvia fulva.',
        symptoms: ['Yellow patches on upper leaf surface, mold on underside.'],
        prevention: ['Ensure good ventilation and reduce humidity.', 'Use fungicides when necessary.']
    },
    {
        name: 'Septoria Leaf Spot',
        image: septoriaSpot,
        description: 'Septoria Leaf Spot causes small, circular spots leading to defoliation in warm, wet conditions.',
        symptoms: ['Small, dark spots with gray centers.'],
        prevention: ['Avoid overhead watering.', 'Remove affected leaves and apply fungicides.']
    },
    {
        name: 'Spider Mites',
        image: spiderMites,
        description: 'Spider Mites cause stippling and bronzing of leaves. Infestation is more likely in hot, dry environments.',
        symptoms: ['Tiny yellow or white spots on leaves.'],
        prevention: ['Spray water to dislodge mites.', 'Use miticides or natural predators.']
    },
    {
        name: 'Target Spot',
        image: targetSpot,
        description: 'Target Spot is caused by Corynespora cassiicola and leads to bullseye lesions on leaves and fruit.',
        symptoms: ['Round lesions with concentric rings.'],
        prevention: ['Improve air circulation.', 'Use resistant cultivars and fungicides.']
    },
    {
        name: 'Tomato Yellow Leaf Curl Virus',
        image: yellowLeafCurl,
        description: 'Transmitted by whiteflies, this virus causes upward curling of leaves and stunted growth.',
        symptoms: ['Yellowing and curling of young leaves.'],
        prevention: ['Control whiteflies using insecticides.', 'Use virus-resistant varieties.']
    },
    {
        name: 'Tomato Mosaic Virus',
        image: mosaicVirus,
        description: 'Tomato Mosaic Virus causes mottling and leaf distortion. It spreads through contact and tools.',
        symptoms: ['Mottled, deformed leaves.'],
        prevention: ['Sanitize tools and hands.', 'Use resistant varieties and remove infected plants.']
    },
];

const TomatoGrid = () => {
    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tomatoDiseases.map((disease, index) => (
                <div key={index} className={`flex flex-col bg-gradient-to-r rounded-lg p-6 shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl 
                    ${index % 2 === 0 ? 'bg-gradient-to-r from-lime-50 via-white to-lime-100 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900' : 
                    'bg-gradient-to-r from-cyan-50 via-white to-cyan-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700'} 
                    transition-all duration-500 ease-in-out`}>
                    
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold text-black dark:text-white bg-opacity-80 bg-gray-300 dark:bg-black p-2 rounded-md">
                            {disease.name}
                        </div>
                        <img src={disease.image} alt={disease.name} className="w-24 h-24 object-cover rounded-lg" />
                    </div>

                    <div className="mt-4 space-y-4">
                        <p className="text-base text-gray-700 dark:text-white">{disease.description}</p>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Symptoms</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-100">
                                {disease.symptoms.map((symptom, i) => (
                                    <li key={i}>{symptom}</li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Prevention</h3>
                            <ul className="list-disc pl-6 text-gray-700 dark:text-white">
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

export default TomatoGrid;