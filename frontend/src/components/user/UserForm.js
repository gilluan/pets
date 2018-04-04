import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import FormikInput from '../../shared/FormikInput'
import FormikForm from '../../shared/FormikForm'
import { Button, Modal, Card } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
]

const InnerForm = props => (
  <FormikForm onSubmit={props.handleSubmit}>

    <Card style={{width: '100%'}}>
                <Card.Content header='Cadastro de Usuário' />
                <Card.Content description='teste'>
    <FormikInput
      fluid
      placeholder='Email'
      name="email"
     />
        <FormikInput
          fluid
          placeholder='Password'
          type='password'
          name='password'
     />
        <FormikInput
          fluid
          placeholder='Name'
          name='name'
    />

    {!props.signup && 
    (<span>
      <FormikInput
      fluid
      placeholder="CPF"
      name="cpf"
      />
        <FormikInput
          fluid
          placeholder='RG'
          name='rg'
      />
        <FormikInput
          fluid
          placeholder='Sexo'
          name='sexo'
      />
      <FormikInput
        fluid
        placeholder="Telefone"
        name="telefone"
      /></span>)
    }
    
                   
                </Card.Content>
                <Card.Content extra>
                  <Button positive icon='checkmark' labelPosition='right' content='Save' type='submit' />
                </Card.Content>
              </Card>
    
  </FormikForm>

)

const UserForm = withFormik({
  mapPropsToValues: props => ({email: '', password: '', name: '', cpf: '', rg: '', sexo: '', telefone: ''}),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required('Password is required!'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    name: Yup.string().required('Name is required!'),
    // cpf: !props.signup ? Yup.string().required('CPF is required') : Yup.string()
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    await props.createUser({variables: {...values}})
    resetForm()
  }
})(InnerForm)

export default UserForm
