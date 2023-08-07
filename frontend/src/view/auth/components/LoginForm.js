import React, { useState } from "react"
import * as Yup from "yup"
import { Formik } from "formik"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  CardHeader,
  Divider,
  Card
} from  "@mui/material"

import { saveClaimsAction, saveTokenAction } from '../../../features/auth/authSlice'
import { loginAxios } from '../../../services/authService'

function LoginForm({}) {
  const key = "token"
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const saveUserAuthDetails = (data) => {
    localStorage.setItem(key,data.access);
    const claims = jwt_decode( data.access);
    console.log('Claims::', claims);
    dispatch(saveTokenAction( data.access));
    dispatch(saveClaimsAction(claims));
    
  };
  return (
    <Formik
      initialValues={{
        email: 'professor@professor.com',
        password: 'password',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={async (values, formikHelpers) => {
        try {
          const { data } = await loginAxios(values);
          saveUserAuthDetails(data);
          formikHelpers.resetForm();
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          navigate('/');
        } catch (e) {
          setError('Failed. Please try again.');
          console.log(e.message);
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
          <form noValidate onSubmit={handleSubmit}>
            <CardHeader title="Login" />
            <Divider />
            <Box m={2}>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                autoFocus
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
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
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />

              <Box mt={2}>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
              {error && (
                <Box mt={3}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}
            </Box>
          </form>
        </Card>
      )}
    </Formik>
  );
};

export default LoginForm;
