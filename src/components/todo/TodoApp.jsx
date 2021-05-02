import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './LoginComponent'
import ListStudyAppComponent from './ListStudyAppComponent'
import FooterComponent from  './FooterComponent'
import AuthenticatedRoute from './AuthenticatedRoute'
import HeaderComponent from './HeaderComponent.jsx'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import LogoutComponent from './LogoutComponent'
import QaComponent from './QaComponent'

class StudyApp extends Component {
    render() {
        return (
            <div className="StudyApp">
            <Router>
                <>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                        <AuthenticatedRoute Route path="/studyapp/:id" component={QaComponent} />   
                        <AuthenticatedRoute path="/studyapp" component={ListStudyAppComponent} />
                        <AuthenticatedRoute Route path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent></FooterComponent>
                </>
            </Router>
            </div>
        )
    }
}

export default StudyApp