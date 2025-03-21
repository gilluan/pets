import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import FormikInput from '../../shared/FormikInput'
import FormikForm from '../../shared/FormikForm'
import { Button, Card, Input, Form } from 'semantic-ui-react'

const InnerForm = props => (
  <FormikForm {...props}>
    <Card style={{ width: '100%' }}>
      <Card.Content header='Cadastro de Pet' />
      <Card.Content description='teste'>
        <Form.Group widths='equal'>
          <FormikInput
            width={16}
            fluid
            control={Input}
            placeholder='Nome do pet'
            name='nome'
          />
          <FormikInput
            fluid
            width={16}
            control={Input}
            placeholder='Especie Pet'
            name='especie'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <FormikInput
            fluid
            width={16}
            control={Input}
            placeholder='Cor'
            name='cor'
          />
          <FormikInput
            fluid
            width={16}
            control={Input}
            placeholder='Raça'
            name='raca'
          />
          <FormikInput
            fluid
            width={16}
            control={Input}
            placeholder='Sexo'
            name='sexo'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <FormikInput
            fluid
            control={Input}
            placeholder='Peso'
            name='peso'
            labelPosition='right' />
          <FormikInput
            fluid
            control={Input}
            placeholder='Nascimento'
            name='nascimento'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <FormikInput
            fluid
            control={Input}
            placeholder='Comportamento'
            name='comportamento'
          />
        </Form.Group>
        <FormikInput
          fluid
          control={Input}
          placeholder='Observacoes'
          name='observacoes'
        />
      </Card.Content>
      <Card.Content extra>
        <Button
          positive
          icon='checkmark'
          labelPosition='right'
          content='Salvar'
          type='submit'
        />
        <Button
          icon='remove'
          labelPosition='right'
          content='Cancelar'
          color='red'
          type='submit'
        />
      </Card.Content>
    </Card>
  </FormikForm>
)

const PetForm = withFormik({
  mapPropsToValues: props => ({
    nome: '',
    especie: '',
    cor: '',
    raca: '',
    sexo: '',
    peso: '',
    nascimento: '',
    comportamento: '',
    observacoes: ''
  }),
  validationSchema: Yup.object().shape({
    nome: Yup.string().required('O Nome é obrigatório!'),
    peso: Yup.string().required('O Peso é obrigatório!')
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    values.usuario = props.user.id
    await props.createPet({
      variables: { ...values }
    })
    resetForm()
  }
})(InnerForm)

export default PetForm
