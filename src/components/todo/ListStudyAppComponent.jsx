import { Component } from "react"
import QADataService from '../../api/study-app/QADataService'
import AuthenticationService from './AuthenticationService'
import {Grid, Paper} from '@material-ui/core'


class ListStudyAppComponent extends Component {
    constructor(props) {
        super(props)
        console.log("ListStudyAppComponent.constructor")
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
        console.log('ListStudyAppComponent.componentDidMount')
        this.refreshTodos()
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        QADataService.retrieveAllQA(username)
            .then(
                response => {
                    console.log(`ListStudyAppComponent.refreshTodos response=${response.data}`)
                    this.setState({
                        QAs: response.data
                    })
                }
            )
    }

    deleteToDoClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        console.log(`ListStudyAppComponent.deleteToDoClicked username=${username}`)
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
        console.log("ListStudyAppComponent.addQAClicked")
        this.props.history.push(`/studyapp/-1`)
    }

    render() {
        const paperStyle={padding: 50, height:'80vh', width:980, margin:'20px auto'}
        
        return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <h2>Flash Card List</h2>
            </Grid>
        
            <div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>category</th>
                                <th>question</th>
                                <th>answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                                this.state.QAs.map(
                                    qa => 
                                    <tr key={qa.qid}>
                                        <td>{qa.category}</td>
                                        <td>{qa.question}</td>
                                        <td>{qa.answer}</td>
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
        </Paper>
        </Grid>  )
    }
}

export default ListStudyAppComponent