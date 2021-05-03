import React, { Component } from 'react'
import {Grid, Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'


import QADataService from '../../api/study-app/QADataService'

class RegistrationComponent extends Component {

      constructor(props) {
        super(props)
        this.state = {
          user_fn: '',
          user_ln: '',
          user_email: '',
          user_pwd: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }

      onSubmit() {
        const qa = {
          user_fn: this.state.user_fn,
          user_ln: this.state.user_ln,
          user_email: this.state.user_email,
          user_pwd: this.state.user_pwd
        }

        if (qa.user_email.length === 0 || qa.user_pwd.length === 0 || qa.user_fn.length === 0) {
          return
        } else {
          QADataService.registerUser(qa)
          .then(() => this.props.history.push('/login'))
        }

        

      }

      handleChange(e) {
        console.log(`inside handleChange(e) of LoginComponent ${e.target.value}` )
        this.setState(
            {
                [e.target.name] : e.target.value
            }
        )
    }

      render() {
        const paperStyle={padding: 50, height:'50vh', width:480, margin:'20px auto'}
        const avatarStyle={backgroundColor:'#1bbd7e'}
        const btnstyle={margin:'40px 0'}

        return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutLinedIcon /></Avatar>
                        <h2>Register</h2>
                    </Grid>
                    <TextField 
                        label='First Name' 
                        placeholder="Enter first name" 
                        fullWidth name="user_fn" 
                        required onChange={this.handleChange}/>

                    <TextField 
                        label='Last Name' 
                        placeholder="Enter last name" 
                        fullWidth name="user_ln" 
                        required onChange={this.handleChange}/>

                    <TextField 
                        label='Email' 
                        placeholder="Enter email" 
                        fullWidth name="user_email" 
                        required onChange={this.handleChange}/>

                    <TextField 
                        label='Password' 
                        placeholder="Enter password" 
                        type="password" 
                        fullWidth name="user_pwd" 
                        required onChange={this.handleChange}/>

                    <Button 
                        type="submit" 
                        color="primary"
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                        onClick={this.onSubmit}
                    >
                        Register
                        
                    </Button> 
                </Paper>
            </Grid>
        )
      }
}

export default RegistrationComponent
