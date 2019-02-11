import React, {Component} from 'react'
import classes from './QuestionCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import {connect} from "react-redux";
import {createQuestionQuestion, finishCreateQuestion} from "../../store/actions/create";

function createOptionControl(number) {
    return createControl({
        label: 'option ' + number,
        errorMessage: 'Value can not ne require',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter Question',
            errorMessage: 'Question can not be require'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuestionCreator extends Component{

    state = {
        isFormValid: false,
        correctAnswer: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const  quiz = {
            question: this.state.formControls.question.value,
            id: this.props.question.length + 1,
            correctAnswer: this.state.correctAnswer,
            answers: [
                {text: this.state.formControls.option1.value, id: this.state.formControls.option1.id},
                {text: this.state.formControls.option2.value, id: this.state.formControls.option2.id},
                {text: this.state.formControls.option3.value, id: this.state.formControls.option3.id},
                {text: this.state.formControls.option4.value, id: this.state.formControls.option4.id},
            ]
        }

        this.props.createQuestionQuestion(quiz)

        this.setState({
            isFormValid: false,
            correctAnswer: 1,
            formControls: createFormControls()
        })
    }

    createQuestionHandler = event => {
        event.preventDefault()

        this.setState({
            isFormValid: false,
            correctAnswer: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuestion()
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return(
                <div key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/>: null }
                </div>
            )
        })
    }

    changeHandler (value, controlName) {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    selectChangeHandler = event => {
        this.setState({
            correctAnswer: +event.target.value
        })
    }

    render() {
        const select = <Select
            label={'Enter correct answer'}
            defaultValue={this.state.correctAnswer}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
            <div className={classes.QuestionCreator}>
                <div>
                    <h1>QuestionCreator</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type={'success'}
                            onClick={this.createQuestionHandler}
                            disabled={this.props.question.length === 0}
                        >
                            Create Test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        question: state.create.question
    }
}

function mapDispatchToProps(dispatch) {
    return{
        createQuestionQuestion: item => dispatch(createQuestionQuestion(item)),
        finishCreateQuestion: () => dispatch(finishCreateQuestion())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreator)
