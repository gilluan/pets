import React, { Component } from "react";
import { withFormik } from "formik";
import Yup from "yup";
import FormikInput from "../../shared/FormikInput";
import FormikForm from "../../shared/FormikForm";
import { Button, Input, Card } from "semantic-ui-react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

const LOGIN_USER = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const InnerForm = props => (
  <FormikForm {...props}>
    <Card fluid>
      <Card.Content>
        <FormikInput fluid control={Input} placeholder="Login" name="login" />
        <FormikInput
          fluid
          control={Input}
          placeholder="Password"
          type="password"
          name="password"
        />
        <Button type="submit">Entrar</Button>
      </Card.Content>
    </Card>
  </FormikForm>
);

const Form = withFormik({
  mapPropsToValues: props => ({ login: "", password: "" }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required("O Password é obrigatório!"),
    login: Yup.string().required("O Login é obrigatório!")
  }),
  handleSubmit: async (values, { props }) => {
    let { login, password } = values;
    let retorno = await props.login({ variables: { email: login, password } });
    console.log(retorno);
    let { data: { login: { token } } } = retorno;
    localStorage.setItem("userToken", token);
    props.history.replace("/users");
  },
  displayName: "LoginForm"
})(InnerForm);

class LoginForm extends Component {
  render() {
    return (
      <Mutation mutation={LOGIN_USER}>
        {login => {
          return <Form login={login} {...this.props} />;
        }}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
