import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { SvgIcon } from '@mui/material';
import { PlusCircle as PlusCircleIcon } from 'react-feather';

import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { useQuery } from 'react-query';
import { loadUsers } from '../../data/api/api';
import { saveClaimsAction } from '../../features/auth/authSlice';

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const savedClaims = JSON.parse(localStorage.getItem('claims'));

  const { data: usersData = { results: [] } } = useQuery('users', loadUsers);
  const users = usersData.results;

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token);
      dispatch(saveClaimsAction(claims));
      localStorage.setItem('claims', JSON.stringify(claims));
    }
  }, [token, savedClaims, dispatch]);

  //console.log(savedClaims?.user_id);

  const loggedInUserId = savedClaims?.user_id;
  const loggedInUser = users?.find(user => user?.id === loggedInUserId);
  const isProfessor = loggedInUser?.is_professor;

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg blur border-radius-sm top-0 z-index-3 shadow position-sticky py-3 start-0 end-0 bg-blue">
      <div className="container px-1">
        <div className="navbar-brand font-weight-bolder ms-lg-0 ">
          <Link to={'/'}>Gradeking</Link>
        </div>
        {token ? (
          <>
            <span>
              {isProfessor && ( 
                <Link to="/create-course">
                  <Button
                    color="primary"
                    variant="contained"
                    className=""
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusCircleIcon />
                      </SvgIcon>
                    }
                  >
                    Create course
                  </Button>
                </Link>
              )}
              <Link to={`/my-enrollments`}>
                <Button color="inherit">My Courses</Button>
              </Link>
              <a className="" href="/">
                <Button color="inherit" onClick={handleLogout}>
                  Sign out
                </Button>
              </a>
            </span>
          </>
        ) : (
          <div className="" id="">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <div
                  className="nav-link text-dark font-weight-bold d-flex align-items-center me-2 "
                  aria-current="page"
                  href=""
                  rel="nofollow"
                  target="_blank"
                >
                  <Link to={'/login'}>Login</Link>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;