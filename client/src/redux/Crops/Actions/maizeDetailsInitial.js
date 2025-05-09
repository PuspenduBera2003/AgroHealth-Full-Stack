import { setMaizeInitial } from "../../Auth/Actions/ActionType/AuthTypes"

const updateMaizeInitial = (data) => {
    return{
        type: setMaizeInitial,
        payload: data
    }
}

export default updateMaizeInitial;