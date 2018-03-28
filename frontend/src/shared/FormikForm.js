import React from 'react';
import { Form } from 'semantic-ui-react'

const FormikForm = (props) => (
    <Form {...props} onSubmit={(e) => props.onSubmit(e)} />
)

export default FormikForm