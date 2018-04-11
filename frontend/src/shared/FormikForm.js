import React from "react";
import { Form, Message, Card } from "semantic-ui-react";

const FormikForm = ({ ...props }) => (
  <Card style={{ width: "100%" }}>
    <Form {...props} onSubmit={e => props.handleSubmit(e)} />
    {Object.keys(props.touched)[0] && Object.keys(props.errors)[0] && props.dirty && (
      <Card.Content>
        <Message
          error
          header="Erros"
          list={Object.keys(props.errors).map(e => props.errors[e])}
        />
      </Card.Content>
    )}
  </Card>
);

export default FormikForm;
