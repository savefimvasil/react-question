import React from 'react'
import classes from './MenuToggle.css'

const MenuToggle = props => {
    const cls = [
        classes.MenuToggle,
        'fa',
        props
    ]
    if (props.isOpen === true) {
        cls.push('fa-times')
        cls.push(classes.open)
    } else {
        cls.push('fa-bars')
    }
    return(
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        >

        </i>
    )
}

export default MenuToggle
