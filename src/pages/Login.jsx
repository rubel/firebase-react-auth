import { Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';

function Login() {
  return (
    <div>
        <div>Login</div>
        <div>
            <Formik
                enableReinitialize
                initialValues={{ uid8:"",password:"" }}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form>
                    <Field
                        component={TextField}
                        type="text"
                        label="Name"
                        name="name"
                      />

                      <Box marginBottom={3} />
                      <Field
                        component={TextField}
                        type="password"
                        label="Password"
                        name="password"
                      />
                      <Box height={30} />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default Login