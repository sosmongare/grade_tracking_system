import React, { useState } from "react"
import * as Yup from "yup"
import { Formik } from "formik"
import { Alert } from "@mui/material"
import { useDispatch } from "react-redux"

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  TextField,
} from  "@mui/material"

import { useNavigate } from "react-router-dom"
import { saveClaimsAction, saveTokenAction } from '../../../features/auth/authSlice'
import jwt_decode from "jwt-decode"
import { registerAxios } from '../../../services/authService'

function RegisterForm() {
  const key = 'token';
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [isAlertVisible, setAlertVisible] = useState(false)

  const saveUserAuthDetails = data => {
    localStorage.setItem(key, data.token)
    const claims = jwt_decode(data.token)
    console.log("Claims::", claims)
    dispatch(saveTokenAction(data.token))
    dispatch(saveClaimsAction(claims))
  }

  return (
    <Formik
      initialValues={{
        email: 'professor@professor.com',
        username: 'professor',
        password: 'password',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        username: Yup.string().required('Required'),
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),
      })}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await registerAxios(values);
          saveUserAuthDetails(data);
          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          navigate('/');
        } catch (e) {
          setError('Failed. Please try again.');
          console.log(e.message);
          setAlertVisible(true);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Card>
          <CardHeader title="Register Form" />
          <Divider />
          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert onClose={() => setAlertVisible(false)} severity="info">
                  {error}!
                </Alert>
              </Box>
            )}
            {isSubmitting ? (
              <Box display="flex" justifyContent="center" my={5}>
                <CircularProgress />
              </Box>
            ) : (
              <Box mt={2}>
            
                    <TextField
                      error={Boolean(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Username"
                      name="username"
                      margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      variant="outlined"
                    />
               
         
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
            
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    margin="normal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
             
                <form onSubmit={handleSubmit}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up
                  </Button>
                </form>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default RegisterForm;
