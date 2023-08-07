import React, { Suspense } from 'react';
import { createGlobalStyle } from "styled-components";

import 'react-quill/dist/quill.snow.css';
import { SnackbarProvider } from 'notistack';
import Helmet from 'react-helmet';
import { LinearProgress } from '@mui/material';
import MainLayout from '../src/Layout/main-layout/MainLayout'

//Auth
import LoginPage from "./view/auth/LoginPage";

//LoggedIn
import CourseListView from '../src/view/courses/LoggedIn/CourseListView'
import CourseCreateView from "./view/courses/LoggedIn/CourseCreateView";

import DataProvider from "./data";

import  {DetailPage}  from './view/Detail/DetailPage';
import NotFoundPage from './view/pages/NotFoundPage';
import Enrollment from './view/courses/LoggedIn/Enrollment';


import Homepage from "./view/Homepage";


import { useSelector } from 'react-redux';


import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Raleway', sans-serif;
  }
  body {
    margin: 2;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

function App() {
  const { claims } = useSelector(state => state.auth)


  return (
    <DataProvider>
      <GlobalStyle />
      <SnackbarProvider dense maxSnack={3}>
      <Router>
      <Helmet
          titleTemplate="%s - Gradefront"
          defaultTitle="Gradefront"
        >
          <meta name="description" content="Gradefront application" />
        </Helmet> 
        <MainLayout>
        <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
        <Routes>

        <Route path="/" element={<Homepage />} />

        <Route path="login/" element={<LoginPage/>} />


        <Route path="/my-enrollments" element={<Enrollment />} />

        <Route path="list-courses/" element={<CourseListView/> } />
        <Route path="create-course/" element={<CourseCreateView/>} />

    
        <Route path="courses/:id" element={<DetailPage/>} />
        <Route path='/not-found' element={<NotFoundPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
    
        </Routes>
        
        </Suspense>
        </MainLayout>
   
      </Router>
       
      </SnackbarProvider>
    </DataProvider>
  );
}

export default App;
