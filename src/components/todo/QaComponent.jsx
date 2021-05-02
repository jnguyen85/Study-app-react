import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import QADataService from '../../api/study-app/QADataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        console.log("param id is: " + this.props.match.params.id)
        this.state = {
            Qid: this.props.match.params.id,
            user_id: 0,
            question: '',
            answer: '',
            category: ''
            
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        if (this.state.Qid===-1) {
            return 
        }
        let username = AuthenticationService.getLoggedInUser()
        QADataService.retrieveQa(username, this.state.Qid)
            .then(response => this.setState({
                Qid: response.data.qid,
                user_id: response.data.user_id,
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
        console.log("save button press with...Qid=" + this.state.Qid)
        console.log("state.Qid=" + this.state.Qid)
        console.log("values.Qid=" + values.Qid)

        let username = AuthenticationService.getLoggedInUser()

        let qa = {
            Qid: this.props.match.params.id,
            user_id: values.user_id,
            question: values.question,
            answer: values.answer,
            category: values.category
        }
        
        console.log("QA send to update/insert ", qa)
        console.log("this.state.Qid=" + this.props.match.params.id)
        if (this.props.match.params.id == -1) {
            QADataService.createQA(username, qa)
                .then(() => this.props.history.push('/studyapp'))
        } else {
            QADataService.updateQA(username, this.state.Qid, qa)
                .then(() => this.props.history.push('/studyapp'))
        }
        
        console.log("done w/ onSubmit " + values)
    }

    render() {

        let {Qid, user_id, question, answer, category} = this.state

        console.log(question, answer)

        return (
            <div>
                <h1>Flash Card</h1>
                <div className="container">
                   <Formik 
                        initialValues={{Qid, user_id, category, question, answer}}
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