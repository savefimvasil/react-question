import {combineReducers} from 'redux';
import questionReducer from './question'
import createReducer from "./create";

export default combineReducers({
    question: questionReducer,
    create: createReducer
})
