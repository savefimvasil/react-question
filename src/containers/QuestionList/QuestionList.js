import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './QuestionList.css'
import Loader from '../../components/UI/Loader/Loader'
// import axios from 'axios'
import {connect} from 'react-redux'
import {fetchQuestions} from "../../store/actions/question";

class QuestionList extends Component{

    renderQuestion = () => {
        return this.props.questions.map((question) => {
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
        this.props.fetchQuestions()
    }

    render() {
        return (
            <div className={classes.QuestionList}>
                <div>
                    <h1>QuestionList</h1>

                    {
                        this.props.loading && this.props.questions.length !== 0
                            ? <Loader/>
                            :<ul>{this.renderQuestion()}</ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        questions: state.question.questions,
        loading: state.question.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchQuestions: () => dispatch(fetchQuestions())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)
