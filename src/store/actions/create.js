import {CREATE_QUESTION_QUESTION, RESET_QUESTION_CREATION} from "./actionTypes";
import axios from "axios";

export function createQuestionQuestion(item) {
    return{
        type: CREATE_QUESTION_QUESTION,
        item
    }
}

export function resetQuestionCreation() {
    return{
        type: RESET_QUESTION_CREATION
    }
}

export function finishCreateQuestion() {
    return async (dispatch, getState) => {
        await axios.post('https://react-question.firebaseio.com/questions.json', getState().create.question)
        dispatch(resetQuestionCreation())
    }
}
