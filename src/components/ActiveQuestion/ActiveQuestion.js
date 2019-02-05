import React from 'react'
import classes from './ActiveQuestion.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuestion = props => (
    <div className={classes.ActiveQuestion}>
        <p className={classes.ActiveQuestion__title}>
            <span>
                <strong>{props.currentQuestion}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.currentQuestion} of {props.questionsLength}</small>
        </p>
        <AnswersList
            answers={props.answers}
            checkAnswerCorrect={props.checkAnswerCorrect}
            state={props.state}
        />
    </div>
)

export default ActiveQuestion
