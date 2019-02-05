import React from 'react'
import classes from './FinishedQuestion.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuestion = (props) => {
    console.log(props.results)
    let totalCorrectAnswers = 0
    for(let key in props.results){
        if(props.results[key] === 'success') totalCorrectAnswers++
    }
    return (
        <div className={classes.FinishedQuestion}>
            <ul>
                {props.question.map((question, index) => {
                    const cls = [
                        'fa',
                        props.results[question.id-1] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[question.id-1]]
                    ]
                    return(
                        <li
                            key={index}
                        >
                            <strong>{index+1}</strong>.&nbsp;
                            {question.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <strong>you have {totalCorrectAnswers} of {props.question.length} right answers</strong>
            <div className={classes.buttonMenu}>
                <Button onClick={props.onReload} type='primary'>Retry</Button>
                <Link to={'/'}>
                    <Button type='success'>go to test list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuestion
