import { deleteMaizeDetails } from './ActionType/CropActionTypes';

export const removeMaizeDetails = (image) => {
    return {
        type: deleteMaizeDetails,
        payload: image,
    };
};