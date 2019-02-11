import axios from 'axios'
import {
    FETCH_QUESTIONS_START,
    FETCH_QUESTIONS_ERROR,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTION_SUCCESS,
    QUESTION_SET_STATE,
    FINISH_QUESTION,
    QUESTION_NEXT_QUESTION,
    QUESTION_RETRY
} from "./actionTypes";

export function fetchQuestions () {
    return async dispatch => {
        dispatch(fetchQuestionsStart())
        try{
            const response = await axios.get('https://react-question.firebaseio.com/questions.json')

            const questions = []

            Object.keys(response.data).forEach((key, index) => {
                questions.push({
                    id: key,
                    name: 'test number ' + (index + 1)
                })
            })

            dispatch(fetchQuestionsSuccess(questions))
        }
        catch (e) {
            dispatch(fetchQuestionsError(e))
        }
    }
}

export function fetchQuestionById(id) {
    return async dispatch => {
        dispatch(fetchQuestionsStart())

        try{
            const response = await axios.get('https://react-question.firebaseio.com/questions/' + id + '.json')
            const question = response.data

            dispatch(fetchQuestionSuccess(question))
        }
        catch (e) {
            dispatch(fetchQuestionsError(e))
        }
    }
}

export function fetchQuestionSuccess(question) {
    return{
        type: FETCH_QUESTION_SUCCESS,
        question
    }
}

export function fetchQuestionsStart() {
    return {
        type: FETCH_QUESTIONS_START
    }
}

export function fetchQuestionsSuccess(questions) {
    return{
        type: FETCH_QUESTIONS_SUCCESS,
        questions
    }
}

export function fetchQuestionsError(e) {
    return {
        type: FETCH_QUESTIONS_ERROR,
        error: e
    }
}

export function questionSetState(answerState, results) {
    return{
        type: QUESTION_SET_STATE,
        answerState, results
    }
}

export function finishQuestion() {
    return{
        type: FINISH_QUESTION
    }
}

export function questionNextQuestion(number) {
    return{
        type: QUESTION_NEXT_QUESTION,
        number
    }
}

export function retryQuestion() {
    return{
        type: QUESTION_RETRY
    }
}

export function questionAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().question
        const results = state.results
        if(answerId === state.question[state.currentQuestion].correctAnswer){
            if(!results[state.currentQuestion]){
                results[state.currentQuestion] = 'success'
            }
            dispatch(questionSetState({[answerId]: 'success'},results))
            let timeout = window.setTimeout(() => {
                if(state.currentQuestion < state.question.length-1){
                    dispatch(questionNextQuestion(state.currentQuestion + 1))
                } else {
                    dispatch(finishQuestion())
                }
                clearInterval(timeout)
            },1000)
        } else {
            results[state.currentQuestion] = 'error'
            dispatch(questionSetState({[answerId]: 'error'},results))
        }
    }
}
