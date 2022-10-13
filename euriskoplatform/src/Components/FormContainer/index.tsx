import React from "react";
import { Formik, Form } from "formik";

const defaultProps = {};

const FormContainer = () => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={() => {
        const toBeRemoved = true;
      }}
    >
      <Form></Form>
    </Formik>
  );
};

FormContainer.defaultProps = defaultProps;

export default FormContainer;
