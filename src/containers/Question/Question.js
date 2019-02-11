import React, {Component} from 'react'
import classes from './Question.css'
import ActiveQuestion from '../../components/ActiveQuestion/ActiveQuestion'
import FinishedQuestion from '../../components/FinishedQuestion/FinishedQuestion'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuestionById, questionAnswerClick, retryQuestion} from "../../store/actions/question";

class Question extends Component{

    async componentDidMount() {
        this.props.fetchQuestionById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuestion()
    }

    render() {
        console.log('props:', this.props)
        return (
            <div className={classes.Question}>
                <h1>Question</h1>
                <div className={classes.QuestionWrapper}>
                    {
                        this.props.loading || !this.props.question
                            ? <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuestion
                                results={this.props.results}
                                question={this.props.question}
                                onReload={this.props.retryQuestion}
                            />
                            : <ActiveQuestion
                                question={this.props.question[this.props.currentQuestion].question}
                                answers={this.props.question[0].answers}
                                currentQuestion={this.props.currentQuestion + 1}
                                questionsLength={this.props.question.length}
                                state={this.props.answerState}
                                checkAnswerCorrect={this.props.questionAnswerClick}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        results: state.question.results,
        currentQuestion: state.question.currentQuestion,
        answerState: state.question.answerState,
        isFinished: state.question.isFinished,
        question: state.question.question,
        loading: state.question.loading
    }
}

function mapDispatchToProps(dispatch) {
    return{
        fetchQuestionById: id => dispatch(fetchQuestionById(id)),
        questionAnswerClick: answerId => dispatch(questionAnswerClick(answerId)),
        retryQuestion: () => dispatch(retryQuestion())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Question)

