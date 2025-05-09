import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import ThemeReducer from "./theme/Reducer/ThemeReducer";
import AuthReducer from "./Auth/Reducers/AuthReducer";
import CropReducer from "./Crops/Reducers/CropReducer";

const rootReducer = combineReducers({
  Theme: ThemeReducer,
  Auth: AuthReducer,
  Crop: CropReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;