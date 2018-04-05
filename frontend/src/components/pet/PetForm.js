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
          name='nome'
        />
        <FormikInput
          fluid
          placeholder='Especie Pet'
          name='especie'
        />
        <FormikInput
          fluid
          placeholder='Cor'
          name='cor'
        />
        <FormikInput
          fluid
          placeholder='Raça'
          name='raca'
        />
        <FormikInput
          fluid
          placeholder='Sexo'
          name='sexo'
        />
        <FormikInput
          fluid
          placeholder='Peso'
          name='peso'
        />
        <FormikInput
          fluid
          placeholder='Nascimento'
          name='nascimento'
        />
        <FormikInput
          fluid
          placeholder='Criado'
          name='criado'
        />
        <FormikInput
          fluid
          placeholder='Ativo'
          name='ativo'
        />
        <FormikInput
          fluid
          placeholder='Comportamento'
          name='comportamento'
        />
        <FormikInput
          fluid
          placeholder='Observacoes'
          name='observacoes'
        />
      </Card.Content>
      <Card.Content extra>
        <Button positive icon='checkmark' labelPosition='right' content='Save' type='submit' />
      </Card.Content>
    </Card>

  </FormikForm>

)

const PetForm = withFormik({
  mapPropsToValues: props => ({ nome: '', especie: '', cor: '', raca: '', sexo: '', peso: '', nascimento: '', criado: '', ativo: '', comportamento: '', observacoes: '' }),
  validationSchema: Yup.object().shape({
    nome: Yup.string()
      .required('Nome is required!')
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    await props.createPet({ variables: { ...values, usuario: props.user } })
    resetForm()
  }
})(InnerForm)

export default PetForm;
