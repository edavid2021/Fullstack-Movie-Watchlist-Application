import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';

function LoginRegister(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gpa, setGpa] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5678/students/${id}`);
        const { first_name, last_name, gpa, enrolled } = response.data;
        setFirstName(first_name);
        setLastName(last_name);
        setGpa(gpa);
        setEnrolled(enrolled === 'true');
      } catch (error) {
        console.error('Error fetching student record:', error);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.put(`http://localhost:5678/students/${id}`, {
        first_name: firstName,
        last_name: lastName,
        gpa: gpa,
        enrolled: enrolled.toString()
      });
      console.log('Student record updated successfully');
      // Show confirmation message
      alert('Student record updated successfully');
      // Redirect back to the previous page
      navigate('/listStudents');

    } catch (error) {
      console.error('Error updating student record:', error);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formfirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formlastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formgpa">
          <Form.Label>GPA</Form.Label>
          <Form.Control type="number" min="0" max="4" step=".01" value={gpa} onChange={(e) => setGpa(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formenrolled">
          <Form.Check type="checkbox" label="Enrolled" checked={enrolled} onChange={(e) => setEnrolled(e.target.checked)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginRegister;
