import { Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";

function Login() {
    const [loginError, setLoginError] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    

    useEffect(() => {
        if (loading) {
          return;
        }
        if (user) navigate("/dashboard");
      }, [user, loading]);

    const submitForm = async(values,form) =>{
        setLoginError("");
        logInWithEmailAndPassword(values.email,values.password).then((res)=>{
            form.resetForm();
            if(res?.type === "error"){
                console.log(res);
                setLoginError(res.message);
            }
        });
    }
  return (
    <div>
        <div><h2>Login</h2></div>
        <Box height={30} />
        {
            !loading && !user && 
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{ email:"",password:"" }}
                    onSubmit={(values,form) => {
                        submitForm(values,form);
                    }}
                >
                    <Form>
                        <Field
                            component={TextField}
                            type="text"
                            label="email"
                            name="email"
                        />

                        <Box marginBottom={3} />
                        <Field
                            component={TextField}
                            type="password"
                            label="Password"
                            name="password"
                        />
                        <Box height={30} />
                        <div style={{color:"red"}}>
                            {loginError}
                            <Box height={30} />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                        <Button type="button" style={{marginLeft:"8px"}} onClick={signInWithGoogle}>
                            Login with Google
                        </Button>
                    </Form>
                </Formik>
            </div>
        }
        {
            loading && <div>Loading...</div>
        }
        <div>{error}</div>
    </div>
  )
}

export default Login