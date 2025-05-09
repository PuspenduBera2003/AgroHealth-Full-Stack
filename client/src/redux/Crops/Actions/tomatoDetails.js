import { setTomatoDetails } from './ActionType/CropActionTypes';

export const updateTomatoDetails = (image, result, timestamp) => {
    return {
        type: setTomatoDetails,
        payload: { image, result, timestamp },
    };
};