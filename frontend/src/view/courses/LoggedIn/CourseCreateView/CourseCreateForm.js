import React, { useState } from "react";
import { Formik } from "formik"
import { useSnackbar } from "notistack"
import Container from 'react-bootstrap/Container';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import QuillEditor from "../../../../components/Quill-Editor";
import { YupCourseValidation } from "./schema/YupCourseValidation"
import { CourseDefaultValue } from "./schema/CourseDefaultValue"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"

const CourseCreateForm = props => {

  const navigate = useNavigate()
 
  const { enqueueSnackbar } = useSnackbar()
  const [error, setError] = useState("")


  return (
    <Container>

    <Formik
      initialValues={CourseDefaultValue}
      validationSchema={YupCourseValidation}
      onSubmit={async (values, formikHelpers) => {
       

        
        try {
          const token = localStorage.getItem('token');
          //console.log(token);
      
          const formData = new FormData();

          formData.append('title', values.title);
          formData.append('overview', values.overview);
       
    
          const response = await axios.post('http://127.0.0.1:8000/api/courses/', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
      
          formikHelpers.setStatus({ success: true });
          formikHelpers.setSubmitting(false);
          enqueueSnackbar('Course Created', {
            variant: 'success',
          });
          // Redirect or perform any other necessary action
          //console.log(response)
          console.log('Course created:', response.data);
          navigate('/list-courses');
        } catch (err) {
          alert('Something happened. Please try again.');
          setError(err.message);
          formikHelpers.setStatus({ success: false });
          formikHelpers.setSubmitting(false);
        }
        //console.log(err.message)
      }}
      
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit} className="">
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
              <CardContent>
                  <TextField
                    error={Boolean(
                      formikProps.touched.title && formikProps.errors.title
                    )}
                    fullWidth
                    helperText={
                      formikProps.touched.title && formikProps.errors.title
                    }
                    label="Course Title"
                    name="title"
                    onBlur={formikProps.handleBlur}
                    onChange={formikProps.handleChange}
                    value={formikProps.values.title}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Overview
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className=""
                      value={formikProps.values.overview}
                      onChange={value =>
                        formikProps.setFieldValue("overview", value)
                      }
                    />
                  </Paper>
                  {formikProps.touched.overview &&
                    formikProps.errors.overview && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {formikProps.errors.overview}
                        </FormHelperText>
                      </Box>
                    )}
                </CardContent>
              </Card>
            </Grid>
   
          </Grid>
          {error && (
            <Box mt={3}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formikProps.isSubmitting}
            >
              Create course
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    </Container>
  );
};

export default CourseCreateForm;
      
