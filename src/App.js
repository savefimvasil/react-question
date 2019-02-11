import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Question from './containers/Question/Question'
import QuestionList from './containers/QuestionList/QuestionList'
import QuestionCreator from './containers/QuestionCreator/QuestionCreator'
import Auth from './containers/Auth/Auth'
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()
    }
  render() {
    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/question/:id" component={Question}/>
            <Route path="/" exact component={QuestionList}/>
            <Redirect to={'/'}/>
        </Switch>
    )
    if(this.props.isAuthenticated){
        routes = (
            <Switch>
                <Route path="/question-creator" component={QuestionCreator}/>
                <Route path="/question/:id" component={Question}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path="/" exact component={QuestionList}/>
                <Redirect to={'/'}/>
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return{
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
