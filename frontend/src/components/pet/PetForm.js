import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import FormikInput from '../../shared/FormikInput'
import FormikForm from '../../shared/FormikForm'
import { Button, Card } from 'semantic-ui-react'

const InnerForm = props => (
  <FormikForm onSubmit={props.handleSubmit}>

    <Card style={{ width: '100%' }}>
      <Card.Content header='Cadastro de Pet' />
      <Card.Content description='teste'>
        <FormikInput
          fluid
          placeholder='Nome do pet'
          name='nomePet'
        />
      </Card.Content>
      <Card.Content extra>
        <Button positive icon='checkmark' labelPosition='right' content='Save' type='submit' />
      </Card.Content>
    </Card>

  </FormikForm>

)

const UserForm = withFormik({
  mapPropsToValues: props => ({ email: '', password: '', name: '', cpf: '', rg: '', sexo: '', telefone: '' }),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    name: Yup.string().required('Name is required!'),
    cpf: Yup.string().required('CPF is required')
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    await props.createUser({ variables: { ...values } })
    resetForm()
  }
})(InnerForm)

export default UserForm
