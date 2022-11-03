import { Box, Button } from '@mui/material';
import MuiTextField from "@mui/material/TextField";
import { Field, Form, Formik } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import React, { useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../firebase';
function Signup() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const religionList = ["Islam","Christanity","Hinduism"]
    const countryList = ["Bangladesh","Saudi Arabia","Turkey","Pakistan","Afganistan","Syria","Iraq","Iran","Qatar"]
    const submitForm = async(values,form) =>{
        console.log(values);
        registerWithEmailAndPassword(values.name,values.email,values.password,values.country,values.religion).then(
            (res) => {
                console.log(res);
            }
        );
        form.resetForm();
    }

    

    useEffect(() => {
        if (loading) {
          return;
        }
        if (user) navigate("/dashboard");
      }, [user, loading]);

  return (
    <div>
        {
            !loading && !user && 
            <div>
                <div>
                <h2>SignUp</h2>
            </div>
            <Box height={10} />
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{ name:"",email:"",password:"",confirm_password:"",country:"",religion:"" }}
                    onSubmit={(values,form) => {
                        submitForm(values,form);
                    }}
                >
                    <Form>
                        <Field
                            component={TextField}
                            type="text"
                            label="Name"
                            name="name"
                            style={{width:"40%"}}
                        />
                        <Box height={10} />
                        <Field
                            component={TextField}
                            type="text"
                            label="email"
                            name="email"
                            style={{width:"40%"}}
                        />

                        <Box height={10} />
                        <Field
                            component={TextField}
                            type="password"
                            label="Password"
                            name="password"
                            style={{width:"40%"}}
                        />
                        <Box height={10} />
                        <Field
                            component={TextField}
                            type="password"
                            label="Confirm Password"
                            name="confirm_password"
                            style={{width:"40%"}}
                        />
                        <Box height={10} />
                        <Field
                            name="religion"
                            component={Autocomplete}
                            options={religionList}
                            style={{ width: "100%" }}
                            renderInput={(params) => (
                            <MuiTextField
                                {...params}
                                name="religion"
                                label="Religion"
                                variant="outlined"
                                style={{width:"40%"}}
                            />
                            )}
                        />
                        <Box height={10} />
                        <Field
                            name="country"
                            component={Autocomplete}
                            options={countryList}
                            style={{ width: "100%" }}
                            renderInput={(params) => (
                            <MuiTextField
                                {...params}
                                name="country"
                                label="Country"
                                variant="outlined"
                                style={{width:"40%"}}
                            />
                            )}
                        />
                        <Box height={20} />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>

                        <Button type="button" style={{marginLeft:"8px"}}>
                            Forget Password?
                        </Button>
                        
                    </Form>
                </Formik>
            </div>
            </div>
        }

        {
            loading && <h4>Loading..</h4>
        }
        
    </div>
  )
}

export default Signup