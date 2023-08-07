import React from "react"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

import Button from "@mui/material/Button"
import { useQuery } from "react-query"

import { loadCourses } from "../../data/api/api"
import { useThisCourse } from "../../data"

export default function Home({ uuid }) {
  const token = localStorage.getItem("token")

  const { data: coursesData = { results: [] } } = useQuery(
    "results",
    loadCourses
  )
  const { course } = useThisCourse(uuid)

  const allResults = coursesData.results

  //console.log(allResults)

  return (
    <div className="container">
      <h2>All Courses</h2>
      {allResults?.map((course, i) => (
        <>
          <Link to={`/courses/${course.uuid}`}>
            <Typography textColor="success.400" fontWeight="xl" my={1}>
              {course.title}
            </Typography>
          </Link>

          {token ? (
            <Link to={`/courses/${course.uuid}`}>
              <Button variant="contained" color="secondary">
                View Course and Enroll
              </Button>
            </Link>
          ) : (
            <Link to="/login">Sign in to Enroll</Link>
          )}
        </>
      ))}
    </div>
  )
}