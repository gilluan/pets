import React from 'react';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
import LoginForm from '../components/login/LoginForm';
import { withRouter } from "react-router-dom";
import { loginUserRequest, loginUserResponse } from "../actions/index";
//import { graphql, compose } from 'react-apollo'


const LoginPage = props => (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <LoginForm {...props} />
            <Message>
              New to us? <a href=''>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
);

export default LoginPage
