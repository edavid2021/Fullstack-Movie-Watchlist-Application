import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
function DisplayStudent() {
  const [student, setStudent] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/students/${id}`)
      .then(response => {
        console.log(response.data);
        setStudent(response.data);
        console.log(student);
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  },[id, student]);

  return (
    <>
    <ListGroup>
      <ListGroup.Item><h2>Name: {student.first_name} {student.last_name}</h2></ListGroup.Item>
      <ListGroup.Item>Id: {student.record_id}</ListGroup.Item>
      <ListGroup.Item>GPA: {student.gpa}</ListGroup.Item>
      <ListGroup.Item>Enrolled: {student.enrolled}</ListGroup.Item>
    </ListGroup>
    <div class="container-fluid mt-3">
        <Link to={`/updateStudent/${student.record_id}`}>
          <Button variant="outline-primary">Edit Student</Button>
        </Link>
        <Link to={`/deleteStudent/${student.record_id}`}>
          <Button variant="outline-danger">Delete Student</Button>{' '}
        </Link>
       
    </div>
    </>

  );
}

export default DisplayStudent;
