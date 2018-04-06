import React from 'react';
import { Field } from 'formik'
import { Form } from 'semantic-ui-react'



const FormikSemanticInput = ({
  field, 
  form: { touched, errors },
  ...props
}) => (
    <Form.Field 
      {...field} {...props} error={
        !!touched[field.name] &&
        !!errors[field.name] && 
        !!errors[field.name]
      }>
      
    </Form.Field>
);

const FormikInput = ({ field, ...props }) => (<Field {...field} {...props} component={FormikSemanticInput} />)

export default FormikInput