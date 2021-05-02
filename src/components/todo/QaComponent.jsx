import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import QADataService from '../../api/study-app/QADataService'
import AuthenticationService from './AuthenticationService'
import { Link } from 'react-router-dom'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        console.log("QaComponent param id is: " + this.props.match.params.id)
        this.state = {
            Qid: this.props.match.params.id,
            user_email: AuthenticationService.getLoggedInUser(),
            question: '',
            answer: '',
            category: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        console.log('TodoComponent.componentDidMount')
        if (this.state.Qid === -1) {
            console.log("go here when this.state.id = -1")
            return 
        }
        console.log("Should not being doing this when this.state.Qid = -1")
        let username = AuthenticationService.getLoggedInUser()
        QADataService.retrieveQa(username, this.state.Qid)
            .then(response => this.setState({
                Qid: response.data.qid,
                user_email: response.data.user_email,
                question: response.data.question,
                answer: response.data.answer,
                category: response.data.category
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.category) {
            errors.category = 'Enter a Description'
        }
        else if(values.question.length < 5) {
                errors.question = 'Enter at least 5 Characters in Description'
        }
        if (!values.question) {
            errors.question = 'Enter a Description'
        }
        else if(values.question.length < 5) {
                errors.question = 'Enter at least 5 Characters in Description'
        }
        if (!values.answer) {
                errors.answer = 'Enter an answer'
        }
        else if(values.answer.length < 5) {
                errors.answer = 'Enter at least 5 Characters in Description'
        }
            return errors
    }

    onSubmit(values) {
        console.log("TodoComponent.onSubmit() is called: ")

        let username = AuthenticationService.getLoggedInUser()
        
        const qa = {
            Qid: this.props.match.params.id,
            user_email: username,
            question: values.question,
            answer: values.answer,
            category: values.category
        }

        console.log("TodoComponent.onSubmit qa.Qid=" + qa.Qid)
        console.log("TodoComponent.onSubmit qa.user_email=" + qa.user_email)
        console.log("TodoComponent.onSubmit qa.question=" + qa.question)
        console.log("TodoComponent.onSubmit qa.answer=" + qa.answer)
        console.log("odoComponent.onSubmit qa.category=" + qa.category)
        
        if (parseInt(qa.Qid) === -1) {
            QADataService.createQA(username, qa)
                .then(() => this.props.history.push('/studyapp'))
        } else {
            QADataService.updateQA(username, this.state.Qid, qa)
                .then(() => this.props.history.push('/studyapp'))
        }
        
        console.log("done w/ onSubmit " + values)
    }

    render() {

        let {Qid, user_email, question, answer, category} = this.state

        console.log(`QAComponent render() ----> Qid=${Qid} user_email=${user_email} question=${question} answer=${answer} category=${category}`)

        return (
            <div className="container">
                <h1>Flash Card</h1>
                <div className="container">
                   <Formik 
                        initialValues={{Qid, user_email, category, question, answer}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                   {
                        (props) => (
                            <Form>
                                <ErrorMessage name="question" component="div" className="alert alert-warning" />
                                <ErrorMessage name="answer" component="div" className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Category</label>
                                    <Field className="form-control" name="category" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Question</label>
                                    <Field className="form-control" name="question" />
                                </fieldset>
                                
                                <fieldset className="form-group">
                                    <label>Answer</label>
                                    <Field className="form-control" name="answer" />
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                                <span style={{width:100}}> </span>
                                <Link className="btn btn-success" to="/studyapp">Cancel</Link>
                            </Form>
                        )
                    }
                   </Formik>
                        
                    
                </div>
            </div>
        )
    }
}

export default TodoComponent