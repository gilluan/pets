import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup';
import FormikInput from '../../shared/FormikInput';
import FormikForm from '../../shared/FormikForm';
import { Button } from 'semantic-ui-react'

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
     <FormikInput
      fluid
      placeholder="Name"
      name="name"
    />
    <FormikInput
      fluid
      placeholder="CPF"
      name="cpf"
      />
    <FormikInput
      fluid
      placeholder="RG"
      name="rg"
      />
    <FormikInput
        fluid
        placeholder="Sexo"
        name="sexo"
      />
      <FormikInput
        fluid
        placeholder="Telefone"
        name="telefone"
      />
    <Button type='submit'>Submit</Button>
  </FormikForm>
);

const UserForm = withFormik({
  mapPropsToValues: props => ({email: '', password: '', name: '', cpf: '', rg: '', sexo: '', telefone: ''}),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    name: Yup.string().required('Name is required!'),
    cpf: Yup.string().required('CPF is required')
  }),
  handleSubmit: async (values, { props }) => {
    props.save(values, props);
  },
})(InnerForm);

export default UserForm;
