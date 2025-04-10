import React from 'react';
import CameraAPI from './CameraAPI';
import FileAPI from './FileAPI';
import { useSelector } from 'react-redux';
import NotAuthenticated from './NotAuthenticated';

const UploadAPI = () => {
    const userDetails = useSelector((state) => state.Auth.userDetails);

    return (
        <div className="w-full p-2 flex flex-wrap gap-5 items-center justify-center relative">
            <div className={`relative ${(!userDetails) || (userDetails && (userDetails.uploadcount >= 5)) ? 'opacity-100 blur-sm' : ''}`}>
                <CameraAPI />
            </div>
            <div className={`relative ${(!userDetails) || (userDetails && (userDetails.uploadcount >= 5)) ? 'opacity-100 blur-sm' : ''}`}>
                <FileAPI />
            </div>
            {/* {userDetails && (userDetails.uploadcount >= 5) && (<NotAuthenticated data = {1} />)}
            {!userDetails && (<NotAuthenticated data = {0} />)} */}
        </div>
    );
};

export default UploadAPI;
