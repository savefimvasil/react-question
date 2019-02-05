import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './QuestionList.css'
import Loader from '../../components/UI/Loader/Loader'
import axios from 'axios'

export default class QuestionList extends Component{

    state = {
        questions: [],
        loading: true
    }

    renderQuestion = () => {
        return this.state.questions.map((question) => {
            return (
                <li
                    key={question.id}
                >
                    <NavLink to={'/question/' + question.id}>
                        {question.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try{
            const response = await axios.get('https://react-question.firebaseio.com/questions.json')

            const questions = []

            Object.keys(response.data).forEach((key, index) => {
                questions.push({
                    id: key,
                    name: 'test number ' + (index + 1)
                })
            })
            this.setState({
                questions,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuestionList}>
                <div>
                    <h1>QuestionList</h1>

                    {
                        this.state.loading
                            ? <Loader/>
                            :<ul>{this.renderQuestion()}</ul>
                    }
                </div>
            </div>
        )
    }
}
