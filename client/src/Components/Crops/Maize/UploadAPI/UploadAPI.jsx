import React from 'react';
import CameraAPI from './CameraAPI';
import FileAPI from './FileAPI';
import { useSelector } from 'react-redux';
import NotAuthenticated from './NotAuthenticated';

const UploadAPI = () => {
    const userDetails = useSelector((state) => state.Auth.userDetails);

    return (
        <div className="w-full px-4 py-6">
            {/* Header Information */}
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200 ease-in-out">Maize Leaf Detection Tool</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 transition-colors duration-200 ease-in-out">
                    Upload a photo of a <span className="text-green-600 dark:text-green-400 font-medium transition-colors duration-200 ease-in-out">maize plant leaf</span> to get the disease diagnosis.
                </p>
            </div>

            {/* Warning Box */}
            <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-200 p-3 rounded shadow-md max-w-xl mx-auto mb-6 text-sm transition-colors duration-200 ease-in-out">
                ⚠️ Please upload only <strong>maize plant leaf</strong> images. Other images may return inaccurate results.
            </div>


            {/* Upload Section */}
            <div className="w-full p-2 flex flex-wrap gap-5 items-center justify-center relative">
                <div className={`relative ${!userDetails ? 'opacity-100 blur-sm' : ''}`}>
                    <CameraAPI />
                </div>
                <div className={`relative ${!userDetails ? 'opacity-100 blur-sm' : ''}`}>
                    <FileAPI />
                </div>
                {!userDetails && <NotAuthenticated data={0} />}
            </div>
        </div>
    );
};

export default UploadAPI;
