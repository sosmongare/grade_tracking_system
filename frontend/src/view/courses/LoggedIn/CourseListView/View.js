import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Paper from "@mui/material/Paper"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { useSnackbar } from "notistack"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material"
import { useDispatch } from "react-redux"
import jwt_decode from "jwt-decode"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import {
  loadCourses,
  loadEnrolleds,
  loadCourse,
  loadGrades,
  loadUsers,
  loadUser
} from "../../../../data/api/api"
import { saveClaimsAction } from "../../../../features/auth/authSlice"

const RootPaper = styled(Paper)`
  max-width: 600px;
  margin: auto;
  padding: 10px;
  margin-top: 10px;
`

const Title = styled(Typography)`
  margin: 10px;
  color: #ffffff; /* Fixed color value */
  font-size: 1.2em;
`

const AddButton = styled(Button)`
  float: right;
`

const ListText = styled(ListItemText)`
  margin-left: 16px;
`

export default function MyCourses() {
  const { id } = useParams()

  const { data: course } = useQuery(["currentCourse", { id }], () =>
    loadCourse(id)
  )

  const [userGrades, setUserGrades] = useState({}) // Initialize as an empty object
  const [userGradeScores, setUserGradeScores] = useState({}) // Initialize as an empty object

  const { data: user } = useQuery(["currentUser", { id }], () => loadUser(id))
  const { enqueueSnackbar } = useSnackbar()
  const [grade_score, setGrade] = useState("")
  const { data = { results: [] } } = useQuery("results", loadCourses)
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const savedClaims = JSON.parse(localStorage.getItem("claims"))
  //  const [userGrades, setUserGrades] = useState({}) // Initialize as an empty object

  useEffect(() => {
    if (token && !savedClaims) {
      const claims = jwt_decode(token)
      dispatch(saveClaimsAction(claims))
      localStorage.setItem("claims", JSON.stringify(claims))
    }
  }, [token, savedClaims, dispatch])

  let results = data.results.filter(
    result => result?.owner_id === savedClaims?.user_id
  )

  const { data: enrolledsData = { results: [] } } = useQuery(
    "enrolleds",
    loadEnrolleds
  )
  const enrolleds = enrolledsData.results

  const { data: usersData = { results: [] } } = useQuery("users", loadUsers)
  const users = usersData.results

  const { data: gradesData = { results: [] } } = useQuery("grades", loadGrades)
  const grades = gradesData.results

  function getEnrollmentsByCourse(courseId) {
    return enrolleds.filter(enrollment => enrollment.course === courseId)
  }

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDropdownChange = event => {
    const courseId = event.target.value
    setSelectedCourse(courseId)
    setIsDialogOpen(true)

    // Initialize the userGrades state for the selected course's enrollments
    const usersForCourse = enrolleds
      .filter(enrollment => enrollment.course === courseId)
      .map(enrollment => enrollment.user)
    const initialGrades = {}
    usersForCourse.forEach(userId => {
      initialGrades[userId] = ""
    })
    setUserGrades(initialGrades)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleGradeChange = (event, userId) => {
    const newGrade = event.target.value
    setUserGradeScores(prevGradeScores => ({
      ...prevGradeScores,
      [userId]: newGrade
    }))
  }

  const addGrade = (evt, courseId) => {
    evt.preventDefault()

    const token = localStorage.getItem("token")

    Object.keys(userGradeScores).forEach(userId => {
      const formData = new FormData()
      formData.append("course", courseId)
      formData.append("user", userId)
      formData.append("grade_score", userGradeScores[userId])

      axios
        .post("http://127.0.0.1:8000/api/grades/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // Handle the response or update any necessary state
          enqueueSnackbar(`You awarded ${userGradeScores[userId]}`, {
            variant: "success"
          })
        })
        .catch(error => {
          // Handle any errors
          console.error(error)
        })
    })

    // Close the dialog after processing
    handleCloseDialog()
  }

  return (
    <div>
      <RootPaper elevation={4}>
        <Title variant="h6">
          Your Courses
          <AddButton
            color="primary"
            variant="contained"
            component={Link}
            to="/create-course"
          >
            New Course
          </AddButton>
        </Title>
        <List dense>
          {results?.map((course, i) => {
            const courseEnrollments = getEnrollmentsByCourse(course.uuid)
            return (
              <React.Fragment key={i}>
                <ListItem>
                  <ListText
                    primary={course.title}
                    secondary={course.overview}
                  />
                  {courseEnrollments.length} enrolled
                  <Button
                    variant="outlined"
                    onClick={handleDropdownChange}
                    value={course.uuid}
                  >
                    View Enrollments
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })}
        </List>
      </RootPaper>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Enrollment Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box minWidth={400}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrolleds
                    .filter(enrollment => enrollment.course === selectedCourse)
                    .map((enrollment, index) => {
                      const user = users.find(
                        user => user.id === enrollment.user
                      )
                      const userId = user?.id
                      const userEmail = user?.email || "-"

                      const courseGrade = grades.find(
                        grade =>
                          grade.course === selectedCourse &&
                          grade.user === userId
                      )

                      return (
                        <TableRow key={index}>
                          <TableCell>{userEmail}</TableCell>
                          <TableCell>
                            {courseGrade ? (
                              <>{courseGrade.grade_score}</>
                            ) : (
                              <TextField
                                // Use a unique ID for each input field
                                id={`Grade-${userId}`}
                                label="Grade"
                                value={userGradeScores[userId] || ""}
                                onChange={event =>
                                  handleGradeChange(event, userId)
                                }
                                type="number"
                                margin="normal"
                                helperText=""
                                className=""
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className=""
            color="secondary"
            onClick={evt => addGrade(evt, selectedCourse, user?.id)}
          >
            Save
          </Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}