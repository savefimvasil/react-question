import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => {
    return (
        <ul className={classes.AnswersList}>
            { props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        checkAnswerCorrect={props.checkAnswerCorrect}
                        state={props.state ? props.state[answer.id] : null}
                    />
                )
            }) }
        </ul>
    )
}

export default AnswersList
