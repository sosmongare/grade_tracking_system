import React from 'react';
import { Container} from "@mui/material"

import Header from './Header';
import CourseCreateForm from './CourseCreateForm';
import Page from '../../../../components/Page';

const CourseCreateView = () => {

  return (
    <Page className="" title="Course Create">
      <Container maxWidth="lg">
        <Header />
        <CourseCreateForm />
      </Container>
    </Page>
  );
};


export default CourseCreateView;
