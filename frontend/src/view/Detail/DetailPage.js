import React from 'react';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";

import { loadCourse } from '../../data/api/api'

import { loadUsers } from '../../data/api/api';
import { useParams } from 'react-router-dom';

import './scss/astro-ecommerce.scss'
import Enrolled from './Imports/Enroll';

const CourseContext = React.createContext();

function DetailPage() {
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const { data: course } = useQuery(["currentCourse", { id }], () =>
    loadCourse(id)
  );

  const { data: usersData = { results: [] } } = useQuery('users', loadUsers);
  const users = usersData.results;

  return (
    <CourseContext.Provider value={course}>
    <div className="container mt-5">
      {course && (
        <>
          <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" my={1}>
            {course.title}
          </Typography>

          <div className="my-5">
           
            <h2> <div dangerouslySetInnerHTML={{ __html: course.overview }} /></h2>
          </div>
          <Typography textColor="success.400" fontWeight="xl" my={1}>
          Course by: {course.username}
          </Typography>
        
          {token ? (
                <Enrolled/>
            ):(
                <Link to="/login">Sign in to Enroll</Link>
            )}
           
          <hr className="dark horizontal my-5" />
        </>
      )}
    </div>
    </CourseContext.Provider>
  );
}

export { CourseContext, DetailPage };