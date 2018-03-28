import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup';
import FormikInput from '../shared/FormikInput';
import FormikForm from '../shared/FormikForm';
import FormikSelect from '../shared/FormikSelect';
import { DisplayFormikState } from '../formik-helper';
import { Button } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


const options = [
  { key: "m", text: 'Male', value: 'male' },
  { key: "f", text: 'Female', value: 'female' },
];

const InnerForm = props =>  (
  <FormikForm onSubmit={props.handleSubmit}>
    <FormikInput
      fluid
      placeholder='Email'
      name="email"
     />
    <FormikInput
      fluid
      placeholder='Password'
      type="password"
      name="password"
     />
     {/*<FormikSelect
      fluid
      placeholder="Genre"
      name="genre"
      options={options}
     />*/}
    <Button type='submit'>Submit</Button>
    <DisplayFormikState {...props} />
  </FormikForm>
);

const UserForm = withFormik({
  mapPropsToValues: props => ({email: '', password: '', genre: '' }),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    // genre: Yup.string()
    //   .required('Genre is required!')
  }),
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    //props.save(values);
    let { email, password } = values;
    let { data: { login: { token } } } = await props.loginMutation({variables: {email, password}})
    console.log(token);
  },
})(InnerForm);

const QUERY =  gql`
  query {
    getUsers {
      id
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!){
    login(email: $email, password: $password) {
      token
    }
}
`

export default compose(
    graphql(QUERY, {name: 'myQ'}),
    graphql(LOGIN_USER, {name: 'loginMutation'})
)(UserForm)
