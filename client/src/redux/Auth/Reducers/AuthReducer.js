// reducers/AuthReducer.js
import { setAuthenticated, setSignUpInitialized, setUserDetails, setMaizeDetails, setMaizeInitial } from "../Actions/ActionType/AuthTypes";
import { authChecker, getUserDetails } from "../../../api/authChecker";
import { getMaizeDetails } from "../../../api/getMaizeDetails";

const auth = async () => {
    const responseAuthChecker = await authChecker();
    if (responseAuthChecker.success) {
        localStorage.setItem('isAuthenticated', true);
        return true;
    } else {
        localStorage.setItem('isAuthenticated', false);
        return false;
    }
}

const user = async () => {
    const userDetails = await getUserDetails();
    if (!userDetails.success)
        return null;
    return userDetails.user
}

const initialState = {
    isAuthenticated: await auth(),
    signUpInitialized: {
        start: false, response: {
            success: false,
            serverReplied: true
        }, email: '', username: '', password: '', token: ''
    },
    showBottomToast: {
        show: false, type: '', message: ''
    },
    userDetails: await user(),
    maizeDetails: []
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case setAuthenticated:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case setUserDetails:
            return {
                ...state,
                userDetails: action.payload
            }
        case setSignUpInitialized:
            return {
                ...state,
                signUpInitialized: { start: action.payload.start, response: action.payload.response, email: action.payload.email, username: action.payload.username, password: action.payload.password, token: action.payload.token }
            }
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


        default:
            return state;
    }
}

export default AuthReducer;