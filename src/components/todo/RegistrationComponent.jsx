import React, { Component } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/Favorite'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

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

        QADataService.registerUser(qa)
          .then(() => this.props.history.push('/login'))

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

{/*

<Grid>
            <Paper elevation={10} style={paperStyle}>
                <div className="container">
                <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutLinedIcon /></Avatar>
                        <h2>Register</h2>
                    </Grid>
                  <div className="container">
                    <Formik 
                          initialValues={{user_fn, user_ln, user_email, user_login, user_pwd}}
                          onSubmit={this.onSubmit}
                          enableReinitialize={true}
                      >
                    {
                          (props) => (
                              <Form>
                                  <ErrorMessage name="question" component="div" className="alert alert-warning" />
                                  <ErrorMessage name="answer" component="div" className="alert alert-warning" />
                                  <fieldset className="form-group">
                                      <label>First name</label>
                                      <Field className="form-control" name="user_fn" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Last name</label>
                                      <Field className="form-control" name="user_ln" />
                                  </fieldset>
                                  
                                  <fieldset className="form-group">
                                      <label>Email</label>
                                      <Field className="form-control" name="user_email" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Password</label>
                                      <Field className="form-control" name="user_pwd" />
                                  </fieldset>
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
                    
                              </Form>
                          )
                      }
                    </Formik>
                  </div>
                </div>
              </Paper>
            </Grid>


*/}