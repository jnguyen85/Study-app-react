import React, {Component} from 'react';
import FlashcardList from './FlashcardList'
import AuthenticationService from './AuthenticationService'
import QADataService from '../../api/study-app/QADataService'

import '../../Floatingcard.css'

class FlashcardApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            QAs: [],
            message: '',
            category: '',
            selectedListOfCategory: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                        QAs: response.data,
                        selectedListOfCategory: response.data
                    })
                }
            )
    }

    handleSubmit(e) {
        console.log(e.target.value)
        const selectedValue = e.target.value;
        let userSelectedListOfCategory = []

        if (selectedValue !== 'All') {
            console.log("doesn't === All")
            this.state.QAs.forEach((q) => {
                if(q.category === selectedValue) {
                    userSelectedListOfCategory.push(q)
                }
            })
            this.setState({
                selectedListOfCategory: userSelectedListOfCategory
            })
        } else {
            this.refreshTodos()
        }
        e.preventDefault()
    }


    render() {
        console.log(this.state.QAs)
        return (
            <div className="header" onSubmit={this.handleSubmit}>
                <form>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" onChange={this.handleSubmit}>
                            <option value="All">All</option>
                            {
                                this.state.QAs.map(q => {
                                    console.log("select element>>> option=" + q.category)
                                    return <option value={q.category} key={q.category}>{q.category}</option>
                                })
                            }
                        </select>
                    </div>
                    <FlashcardList flashcards={this.state.selectedListOfCategory}  />
                </form>
                
            </div>
        )
    }
}

export default FlashcardApp

