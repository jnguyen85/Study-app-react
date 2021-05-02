import { Component } from "react"
import QADataService from '../../api/study-app/QADataService'
import AuthenticationService from './AuthenticationService'



class ListStudyAppComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            QAs: [],
            message: null
        }
        this.deleteToDoClicked = this.deleteToDoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.updateToDoClicked = this.updateToDoClicked.bind(this)
        this.addQAClicked = this.addQAClicked.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos()
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        QADataService.retrieveAllQA(username)
            .then(
                response => {
                    this.setState({
                        QAs: response.data
                    })
                }
            )
    }

    deleteToDoClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        console.log(id + " " + username)
        QADataService.deleteQA(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of QA ${id} Successful`})
                    this.refreshTodos()
                }
            )
    }

    updateToDoClicked(id) {
        console.log('update to do clicked...qa id: ' + id)
        this.props.history.push(`/studyapp/${id}`)
    }

    addQAClicked() {
        this.props.history.push(`/studyapp/-1`)
    }

    render() {
        return (
            <div>
                <h1>List Study App</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>QId</th>
                                <th>question</th>
                                <th>answer</th>
                                <th>category</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.QAs.map(
                                    qa => 
                                    <tr key={qa.qid}>
                                        <td> {qa.qid}</td>
                                        <td>{qa.question}</td>
                                        <td>{qa.answer}</td>
                                        <td>{qa.category}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                onClick={() => this.updateToDoClicked(qa.qid)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                onClick={() => this.deleteToDoClicked(qa.qid)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>     
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                          <button className="btn btn-success" onClick={this.addQAClicked}>Add</button>  
                    </div>
                </div>
            </div>  
        )
    }
}

export default ListStudyAppComponent