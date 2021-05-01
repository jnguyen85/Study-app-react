import {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/study-app/HelloWorldService.js'


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: null
        }
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your study app <Link to="/studyapp">here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message
                    <button onClick={this.retrieveWelcomeMessage} 
                    className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveWelcomeMessage() {

        HelloWorldService.executeHelloWorldService()
        .then((response) => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data
        })
    }

    handleError(error) {
        console.log(error)
        //this.setState({welcomeMessage: response.data.message})
    }

}


export default WelcomeComponent