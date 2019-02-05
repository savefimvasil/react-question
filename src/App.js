import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Question from './containers/Question/Question'
import QuestionList from './containers/QuestionList/QuestionList'
import QuestionCreator from './containers/QuestionCreator/QuestionCreator'
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/question-creator" component={QuestionCreator}/>
                    <Route path="/question/:id" component={Question}/>
                    <Route path="/" component={QuestionList}/>
                </Switch>
            </Layout>
        </div>
    );
  }
}

export default App;
