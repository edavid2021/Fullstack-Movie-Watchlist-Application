import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
function DeleteStudent() {
  const [student, setStudent] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
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
  const handleDelete = async (event) => {
    event.preventDefault();
  
    try {
      await axios.delete(`/students/${id}`);
      console.log('Student record deleted successfully');
      // Show confirmation message
      alert('Student record deleted successfully');
      // Redirect back to the previous page
      navigate('/listStudents');

    } catch (error) {
      console.error('Error updating student record:', error);
    }
  };

  return (
    <>
    <h1>Are you Sure You Want To Delete This Student?</h1>
    <ListGroup>
      <ListGroup.Item><h2>Name: {student.first_name} {student.last_name}</h2></ListGroup.Item>
      <ListGroup.Item>Id: {student.record_id}</ListGroup.Item>
      <ListGroup.Item>GPA: {student.gpa}</ListGroup.Item>
      <ListGroup.Item>Enrolled: {student.enrolled}</ListGroup.Item>
    </ListGroup>
    <div class="container-fluid mt-3">
        <Button variant="outline-danger" onClick={handleDelete}>Delete Student</Button>{' '}
    </div>
    </>

  );
}

export default DeleteStudent;