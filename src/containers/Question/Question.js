import React, {Component} from 'react'
import classes from './Question.css'
import ActiveQuestion from '../../components/ActiveQuestion/ActiveQuestion'
import FinishedQuestion from '../../components/FinishedQuestion/FinishedQuestion'
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

class Question extends Component{
    state = {
        results: {},
        currentQuestion: 0,
        answerState: null,
        isFinished: false,
        question: [],
        loading: true
    }

    checkAnswerCorrect = (answerId) => {
        const results = this.state.results
        if(answerId === this.state.question[this.state.currentQuestion].correctAnswer){
            if(!results[this.state.currentQuestion]){
                results[this.state.currentQuestion] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            let timeout = window.setTimeout(() => {
                if(this.state.currentQuestion < this.state.question.length-1){
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    })
                } else {
                    this.setState({
                        isFinished: true
                    })
                }
                clearInterval(timeout)
            },1000)
        } else {
            results[this.state.currentQuestion] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    reloadState = () => {
        this.setState({
            results: {},
            currentQuestion: 0,
            answerState: null,
            isFinished: false
        })
    }

    async componentDidMount() {
        try{
            const response = await axios.get('https://react-question.firebaseio.com/questions/' + this.props.match.params.id + '.json')
            const question = response.data
            console.log(question)
            this.setState({
                question,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Question}>
                <h1>Question</h1>
                <div className={classes.QuestionWrapper}>

                    {
                        this.state.loading
                            ? <Loader/>
                            : this.state.isFinished
                            ? <FinishedQuestion
                                results={this.state.results}
                                question={this.state.question}
                                onReload={this.reloadState}
                            />
                            : <ActiveQuestion
                                question={this.state.question[this.state.currentQuestion].question}
                                answers={this.state.question[0].answers}
                                currentQuestion={this.state.currentQuestion + 1}
                                questionsLength={this.state.question.length}
                                state={this.state.answerState}
                                checkAnswerCorrect={this.checkAnswerCorrect}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Question
