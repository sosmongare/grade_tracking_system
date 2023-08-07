import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useQuery } from "react-query";

import { loadCourses, loadEnrolleds, loadGrades, loadUsers } from "../../../data/api/api";

const ListText = styled(ListItemText)`
  margin-left: 16px;
`;

export default function FormDialog({ courseEnrollments }) {
  const [open, setOpen] = React.useState(false);

  const { data: usersData = { results: [] } } = useQuery("users", loadUsers);
  const users = usersData.results;

  const { data: gradesData = { results: [] } } = useQuery("grades", loadGrades);
  const grades = gradesData.results;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Enrollments
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enrollments Details</DialogTitle>
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
                  {courseEnrollments?.map((enrollment, index) => {
                    const user = users.find((user) => user.id === enrollment.user);
                    const grade = grades.find((grade) => grade.enrollment === enrollment.id);

                    return (
                      <TableRow key={index}>
                        <TableCell>{user ? user.email : "-"}</TableCell>
                        <TableCell>{grade ? grade.grade : "-"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}