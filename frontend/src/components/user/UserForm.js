import React from "react";
import { withFormik } from "formik";
import Yup from "yup";
import FormikInput from "../../shared/FormikInput";
import FormikForm from "../../shared/FormikForm";
import { Button, Modal, Card, Form, Input, Message } from "semantic-ui-react";
import FormikSelect from "../../shared/FormikSelect";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

const InnerForm = props => (
  <FormikForm {...props}>
    <Card style={{ width: "100%" }}>
      <Card.Content header="Cadastro de Usuário" />
      <Card.Content description='teste'>
        <Form.Group widths="equal">
          <FormikInput control={Input} fluid placeholder="Email" name="email" />
        </Form.Group>
        <Form.Group widths="equal">
          <FormikInput
            control={Input}
            width={16}
            fluid
            placeholder="Name"
            name="name"
          />
          <FormikInput
            fluid
            control={Input}
            width={16}
            placeholder="Password"
            type="password"
            name="password"
          />
        </Form.Group>
        {!props.signup && (
          <Form.Group widths="equal">
            <FormikInput control={Input} fluid placeholder="CPF" name="cpf" />
            <FormikInput control={Input} fluid placeholder="RG" name="rg" />
            <FormikSelect fluid placeholder="Sexo" name="sexo" options={options} />
            <FormikInput control={Input} fluid placeholder="Telefone" name="telefone" />
          </Form.Group>
        )}
      </Card.Content>
      <Card.Content extra>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Save"
          type="submit"
        />
      </Card.Content>
    </Card>
  </FormikForm>
);

const UserForm = withFormik({
  mapPropsToValues: props => ({
    email: "",
    password: "",
    name: "",
    cpf: "",
    rg: "",
    sexo: "",
    telefone: ""
  }),
  validationSchema: Yup.object().shape({
    password: Yup.string().required("O Password é obrigatório!"),
    email: Yup.string()
      .email("O Email é inválido")
      .required("O Email é obrigatório!"),
    name: Yup.string().required("O Nome é obrigatório!"),
    sexo: Yup.string().required()
    // cpf: !props.signup ? Yup.string().required('CPF is required') : Yup.string()
  }),
  handleSubmit: async (values, { props, resetForm }) => {
    await props.createUser({ variables: { ...values } });
    resetForm();
  }
})(InnerForm);

export { UserForm };
