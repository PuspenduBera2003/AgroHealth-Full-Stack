import { setTomatoInitial } from "../Actions/ActionType/CropActionTypes"

const updateTomatoInitial = (data) => {
    return{
        type: setTomatoInitial,
        payload: data
    }
}

export default updateTomatoInitial;