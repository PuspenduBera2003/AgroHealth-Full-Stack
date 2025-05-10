import { deleteTomatoDetails } from './ActionType/CropActionTypes';

export const removeTomatoDetails = (image) => {
    return {
        type: deleteTomatoDetails,
        payload: image,
    };
};