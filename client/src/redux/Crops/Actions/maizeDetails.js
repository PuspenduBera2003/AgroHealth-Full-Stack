import { setMaizeDetails } from './ActionType/CropActionTypes';

export const updateMaizeDetails = (image, result, timestamp) => {
    return {
        type: setMaizeDetails,
        payload: { image, result, timestamp },
    };
};