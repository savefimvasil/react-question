import React, {Component} from 'react'
import classes from './Draver.css'
import {NavLink} from 'react-router-dom'

import Backdrop from '../../UI/Backdrop/Backdrop'

class Draver extends Component {
    renderLinks (links) {
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

        const links = [
            {to: '/', label: 'List', exact: true},
            // {to: '/auth', label: 'Auth', exact: false},
        ]

        if(this.props.isAuthenticated){
            links.push({to: '/question-creator', label: 'Create Test', exact: false})
            links.push({to: '/logout', label: 'Exit', exact: false})
        } else {
            links.push({to: '/auth', label: 'Auth', exact: false})
        }

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Draver
