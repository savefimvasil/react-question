import {CREATE_QUESTION_QUESTION, RESET_QUESTION_CREATION} from "../actions/actionTypes";

const initialState = {
    question: []
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUESTION_QUESTION:
            return{
                ...state,
                question: [...state.question, action.item]
            }
        case RESET_QUESTION_CREATION:
            return{
                ...state, question: []
            }
        default:
            return state
    }
}
