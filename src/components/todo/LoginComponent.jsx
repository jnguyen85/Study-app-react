import React from 'react'
import {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


class LoginComponent extends Component {
    constructor(props) {
        super()
        this.state = {
            username: 'user',
            password: 'password',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    

    handleChange(e) {
        console.log(`inside handleChange(e) of LoginComponent ${e.target.value}` )
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

    loginClicked(e) {
       
        console.log(`about to call AuthenticationService.executeBasicAuthenticationService username:${this.state.username} password:${this.state.password}`)
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log(`get response back from server>>>>response.data:` + response.data)
                if (response.data === undefined || response.data === null || response.data.length === 0) {
                    this.props.history.push(`/login`)
                    this.setState({hasLoginFailed: true})
                }
                else {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                    this.props.history.push(`/welcome/${this.state.username}`)
                }
                
            }).catch(() => {
                this.setState({showSuccessMessage: false})
                this.setState({hasLoginFailed: true})
            })
    }

    render() {
        const paperStyle={padding: 50, height:'40vh', width:480, margin:'20px auto'}
        const avatarStyle={backgroundColor:'#1bbd7e'}
        const btnstyle={margin:'8px 0'}

        return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutLinedIcon /></Avatar>
                        <h2>Sign in</h2>
                    </Grid>
                    <TextField 
                        label='Email' 
                        placeholder="Enter email" 
                        fullWidth name="username" 
                        required onChange={this.handleChange}/>

                    <TextField 
                        label='Password' 
                        placeholder="Enter password" 
                        type="password" 
                        fullWidth name="password" 
                        required onChange={this.handleChange}/>
                    
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}

                    <FormControlLabel
                        control={
                            <Checkbox 
                                name="checkedB"
                                color="primagry"
                            />
                        }
                        label="Remember me"
                    />
                    <Button 
                        type="submit" 
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        onClick={this.loginClicked}
                    >
                        Sign In
                        
                    </Button>

                    <Typography>
                        <Link href="#">
                            Forgot password
                        </Link>
                    </Typography>
                    <Typography>
                        <Link href="#"> Do you hava an account ?
                            Sign UP ?
                        </Link>
                    </Typography>

                   {/* 
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    */}
                    
                </Paper>
            </Grid>
        )
    }
}

export default LoginComponent