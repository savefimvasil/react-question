import {combineReducers} from 'redux';
import questionReducer from './question'
import createReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
    question: questionReducer,
    create: createReducer,
    auth: authReducer
})
