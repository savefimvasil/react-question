import React from 'react'
import classes from './Input.css'

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    function isInvalid({valid, touched, shouldValidate}) {
        return !valid && shouldValidate && touched
    }

    const invalid = (isInvalid(props)) ? classes.invalid : ''

    return(
        <div className={classes.Input}>
            <label
                className={invalid}
                htmlFor={htmlFor}
            >
                {props.label}
            </label>
            <input
                type={inputType}
                className={cls.join(' ')}
                value={props.value}
                onChange={props.onChange}
                id={htmlFor}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Enter correct value'}</span>
                    : null
            }
        </div>
    )
}

export default Input
