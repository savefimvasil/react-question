import React, {Component} from 'react'
import classes from './Draver.css'
import {NavLink} from 'react-router-dom'

import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Auth', exact: false},
    {to: '/question-creator', label: 'Create Test', exact: false},
]

class Draver extends Component {
    renderLinks () {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [classes.Draver]
        if(!this.props.isOpen) {
            cls.push(classes.close)
        }

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Draver
