import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import ThemeReducer from "./theme/Reducer/ThemeReducer";
import AuthReducer from "./Auth/Reducers/AuthReducer";

const rootReducer = combineReducers({
  Theme: ThemeReducer,
  Auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;