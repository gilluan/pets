import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from "formik";

const FormikSemanticSelect = ({
  field: { name },
  form: {touched, errors, setFieldTouched, setFieldValue},
  options,
  onChange,
  ...props
}) => {
  const handleChange = (event, key, data) => {
    setFieldTouched(name, true);
    setFieldValue(name, data);

    if (onChange) {
      onChange(event, key, data);
    }
  };

return (
  <Form.Field>
      <Form.Select
        {...props}
        name={name}
        error={ !!touched[name] && !!errors[name] }
        options={options}
        onChange={handleChange}
        onBlur={setFieldTouched}
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
  </Form.Field>
);
};

const FormikSelect = (field, options, ...props) => (
  <Field
    {...field}
    component={FormikSemanticSelect}
    {...props}
  >
  </Field>
);

export default FormikSelect;
