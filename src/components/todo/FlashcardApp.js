import React, {Component, useState, useEffect} from 'react';
import FlashcardList from './FlashcardList'
import AuthenticationService from './AuthenticationService'
import QADataService from '../../api/study-app/QADataService'

import '../../Floatingcard.css'

class FlashcardApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            QAs: [],
            message: null
        }
    }


    componentDidMount() {
        console.log('FlashcardApp.componentDidMount')
        this.refreshTodos()
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        QADataService.retrieveAllQA(username)
            .then(
                response => {
                    console.log(`FlashcardApp.refreshTodos response=${response.data}`)
                    this.setState({
                        QAs: response.data
                    })
                }
            )
    }



    render() {
        console.log(this.state.QAs)
        return (
            <div className="container">
                <FlashcardList flashcards={this.state.QAs} />
            </div>
        )
    }
}

export default FlashcardApp

