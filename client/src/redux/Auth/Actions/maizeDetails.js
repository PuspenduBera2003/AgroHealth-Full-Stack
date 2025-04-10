import { setMaizeDetails } from './ActionType/AuthTypes';

export const updateMaizeDetails = (image, result, timestamp) => {
    return {
        type: setMaizeDetails,
        payload: { image, result, timestamp },
    };
};