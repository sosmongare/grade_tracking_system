import React, { useState, useContext, useEffect,useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode"
import { useQuery } from "react-query";
import { loadEnrolleds } from '../../../data/api/api'
import { saveClaimsAction } from '../../../features/auth/authSlice';

import { CourseContext } from '../DetailPage';
const Enrolled = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const course = useContext(CourseContext);
  const ownerId = course?.owner_id;
  const { data:enrolledsData = { results: [] }} = useQuery("enrolleds", loadEnrolleds);
  const enrolleds = enrolledsData.results;

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const savedClaims = JSON.parse(localStorage.getItem('claims'));

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token);
      dispatch(saveClaimsAction(claims));
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [token, savedClaims, dispatch]);

  const CourseEnrolleds = enrolleds?.filter((enrolled)=> enrolled?.course === course?.uuid);
  console.log(enrolleds)
  console.log(CourseEnrolleds)
  const checkUserEnrolled = useCallback(() => {
    const userEnrolleds = CourseEnrolleds.filter(enrolled => enrolled?.user === savedClaims?.user_id);
    setIsEnrolled(userEnrolleds?.length > 0);


  }, [CourseEnrolleds, savedClaims?.user_id]);

  useEffect(() => {
    checkUserEnrolled();
  }, [checkUserEnrolled, CourseEnrolleds, savedClaims?.user_id]);
  

  const handleEnrolledClick = (evt) => {
    evt.preventDefault();
    if (isEnrolled) {
      enqueueSnackbar("You have already enrolled for this course.", {
        variant: 'warning',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('course', course?.uuid);
  
    const token = localStorage.getItem('token');
  
    axios
      .post('http://127.0.0.1:8000/api/enrolled/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        enqueueSnackbar(`You've enrolled`, {
          variant: 'success',
        });
        setIsEnrolled(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <span>
      <Button variant="contained" color="secondary" onClick={handleEnrolledClick} disabled={isEnrolled}>
        Enroll
      </Button>
    </span>
  );
};

export default Enrolled;
