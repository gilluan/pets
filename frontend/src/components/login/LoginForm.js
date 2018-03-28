
import React, { Component }  from 'react'
import { withFormik } from 'formik'
import Yup from 'yup';
import FormikInput from '../../shared/FormikInput';
import FormikForm from '../../shared/FormikForm';
import { Button } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { withRouter } from "react-router-dom";


const LOGIN_USER = gql`
  mutation loginMutation($email: String!, $password: String!){
      login(email: $email, password: $password) {
        token
      }
  }
`;

const InnerForm = props => (
  <FormikForm onSubmit={props.handleSubmit}>
    <FormikInput
      fluid
      placeholder='Login'
      name="login"
     />
    <FormikInput
      fluid
      placeholder='Password'
      type="password"
      name="password"
     />
    <Button type='submit'>Entrar</Button>
  </FormikForm>
);

const Form = withFormik({
  mapPropsToValues: props => ({login: '', password: ''}),
  validationSchema: Yup.object().shape({
  password: Yup.string()
    .required('Password is required!'),
  login: Yup.string()
    .required('Login is required!')
  }),
  handleSubmit: async (values, { props }) => {
    let { login, password } = values
    let retorno = await props.login({variables: {email: login, password}})
    console.log(retorno);
    let { data: { login: { token } } } = retorno
    localStorage.setItem('userToken', token)
    props.history.replace('/')
  },
  displayName: 'LoginForm'
})(InnerForm);

class LoginForm extends Component {
  render() {
    return (
      <Mutation mutation={LOGIN_USER}>
        {login => {
          return (
            <Form login={login} {...this.props} />
          )
        }}

      </Mutation>
    )
  }
}


export default withRouter(LoginForm);
