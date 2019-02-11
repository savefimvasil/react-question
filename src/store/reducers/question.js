import {
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTIONS_ERROR,
    FETCH_QUESTIONS_START,
    FETCH_QUESTIONS_SUCCESS,
    FINISH_QUESTION,
    QUESTION_NEXT_QUESTION,
    QUESTION_SET_STATE,
    QUESTION_RETRY
} from "../actions/actionTypes";

const initialState = {
    questions: [],
    loading: false,
    error: null,
    results: {},
    currentQuestion: 0,
    answerState: null,
    isFinished: false,
    question: null,
}

export default function questionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUESTIONS_START:
            return{
                ...state, loading: true
            }
        case FETCH_QUESTIONS_SUCCESS:
            return{
                ...state, loading: false, questions: action.questions
            }
        case FETCH_QUESTIONS_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case FETCH_QUESTION_SUCCESS:
            return{
                ...state, loading: false, question: action.question
            }
        case QUESTION_SET_STATE:
            return{
                ...state, answerState: action.answerState, results: action.results
            }
        case FINISH_QUESTION:
            return{
                ...state, isFinished: true
            }
        case QUESTION_NEXT_QUESTION:
            return{
                ...state, answerState: null, currentQuestion: action.number
            }
        case QUESTION_RETRY:
            return{
                ...state,
                results: {},
                currentQuestion: 0,
                answerState: null,
                isFinished: false
            }

        default:
            return state
    }
}
