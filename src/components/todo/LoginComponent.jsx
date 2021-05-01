
import {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            username: 'John',
            password: 'dummy',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    

    handleChange(e) {
        console.log(e.target.value)
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

    loginClicked(e) {
        console.log(`{this.state.username} {this.state.password}`)
        if (this.state.username==='John' && this.state.password==='dummy') {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else {
            this.setState({
                showSuccessMessage: false
            })
            this.setState({
                hasLoginFailed: true
            })
        }

    }

    render() {
      return (
        <div>
            <h1>Login</h1>
            <div className="container">
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
        </div>
      )
    }
}

export default LoginComponent