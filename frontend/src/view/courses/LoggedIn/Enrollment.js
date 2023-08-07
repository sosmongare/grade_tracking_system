import React, { useEffect } from "react"
import Typography from "@mui/joy/Typography"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import { Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import jwt_decode from "jwt-decode"
import { useParams } from "react-router-dom"

import { useQuery } from "react-query"
import { saveClaimsAction } from "../../../features/auth/authSlice"

import {
  loadEnrolleds,
  loadGrades,
  loadCourses,
  loadCourse
} from "../../../data/api/api"

export default function Enrollment(props) {
  const { id } = useParams()

  const { data: course } = useQuery(["currentCourse", { id }], () =>
    loadCourse(id)
  )

  const { data: enrolledsData = { results: [] } } = useQuery(
    "enrolleds",
    loadEnrolleds
  )
  const enrolleds = enrolledsData.results

  const { data: coursesData = { results: [] } } = useQuery(
    "courses",
    loadCourses
  )
  const courses = coursesData.results

  const { data: gradesData = { results: [] } } = useQuery("grades", loadGrades)
  const grades = gradesData.results

  //console.log("grades:", grades)

  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const savedClaims = JSON.parse(localStorage.getItem("claims"))

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token)
      dispatch(saveClaimsAction(claims))
      localStorage.setItem("claims", JSON.stringify(claims))
    }
  }, [token, savedClaims, dispatch])

  const userEnrolleds = enrolleds.filter(
    enrolled => enrolled.user === savedClaims?.user_id
  )
  //console.log(userEnrolleds);

  const enrolledCourses = courses.filter(course => {
    const isEnrolled = userEnrolleds.some(
      enrolled => enrolled.course === course.uuid
    )
    return isEnrolled
  })
  //console.log("enrolled:", enrolledCourses)

  return (
    <div className="container">
      <h2>You're Currently enrolled in {enrolledCourses.length} courses </h2>

      {enrolledCourses?.map((course, i) => {
        // Find the corresponding grade for the current course and user
        const courseGrade = grades.find(
          grade =>
            grade.course === course.uuid && grade.user === savedClaims?.user_id
        )

        return (
          <Link to={`/courses/${course.uuid}`} key={course.uuid}>
            <Card variant="outlined" sx={{ width: 320 }}>
              <Typography level="h2" fontSize="XL" sx={{ mb: 0 }}>
                {course.title}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <div>
                  <Typography fontSize="lg" fontWeight="lg">
                    {course.overview}
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Explore"
                  sx={{ ml: "auto", fontWeight: 600 }}
                >
                  Awarded: {courseGrade ? courseGrade.grade_score : "Not awarded"}
                </Button>
              </Box>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}