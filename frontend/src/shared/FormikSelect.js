import React from "react";
import { render } from "react-dom";
import { Field, Form as FormFormik } from "formik";
import { withFormik } from "formik";
import Yup from "yup";
import { Form, Select } from "semantic-ui-react";

const FormikSemanticSelect = ({
  field: { name, value },
  form: { touched, errors, setFieldTouched, setFieldValue },
  options,
  onChange,
  ...props
}) => {
  const handleChange = (event, key, data) => {
    setFieldTouched(name, true)
    setFieldValue(name, key.value)

    if (onChange) {
      onChange(event, key, data)
    }
  }

  return (
    <Form.Field>
      <Select
        {...props}
        name={name}
        value={value}
        options={options}
        onChange={handleChange}
        onBlur={setFieldTouched}
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
    </Form.Field>
  )
}

const FormikSelect = ({ field, ...props }) => (<Field {...field} {...props} component={FormikSemanticSelect} />)

export default FormikSelect;
