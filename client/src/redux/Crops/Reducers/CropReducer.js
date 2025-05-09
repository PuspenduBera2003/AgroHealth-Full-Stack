// reducers/AuthReducer.js
import { setMaizeDetails, setMaizeInitial, setTomatoDetails, setTomatoInitial } from "../Actions/ActionType/CropActionTypes";

const initialState = {
    maizeDetails: [],
    tomatoDetails: []
}

const CropReducer = (state = initialState, action) => {
    switch (action.type) {
        case setMaizeInitial:
            return {
                ...state,
                maizeDetails: action.payload
            }
        case setMaizeDetails:
            const updatedMaizeDetails = state.maizeDetails && state.maizeDetails.length > 0
                ? [
                    {
                        image: action.payload.image,
                        result: action.payload.result,
                        timestamp: action.payload.timestamp
                    },
                    ...state.maizeDetails
                ]
                : [
                    {
                        image: action.payload.image,
                        result: action.payload.result,
                        timestamp: action.payload.timestamp
                    }
                ];

            return {
                ...state,
                maizeDetails: updatedMaizeDetails,
            };
        case setTomatoInitial:
            return {
                ...state,
                tomatoDetails: action.payload
            }
        case setTomatoDetails:
            const updatedTomatoDetails = state.tomatoDetails && state.tomatoDetails.length > 0
                ? [
                    {
                        image: action.payload.image,
                        result: action.payload.result,
                        timestamp: action.payload.timestamp
                    },
                    ...state.tomatoDetails
                ]
                : [
                    {
                        image: action.payload.image,
                        result: action.payload.result,
                        timestamp: action.payload.timestamp
                    }
                ];

            return {
                ...state,
                tomatoDetails: updatedTomatoDetails,
            };


        default:
            return state;
    }
}

export default CropReducer;