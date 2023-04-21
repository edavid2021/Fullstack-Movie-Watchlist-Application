import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ListStudents() {
  const [students, setStudents] = useState([]);
  const location = useLocation();
  //this is edited
  useEffect(() => {
    axios.get(`/students${location.search}`)
      .then(response => {
        setStudents(response.data.students);
        console.log("this got edited")
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  }, [location]);

  const handleRowClick = (id) => {
    // Navigate to the displayStudent page with the selected student id
    window.location.href = `/displayStudent/${id}`;
  };

  const renderTableRows = () => {
    if (!students || students.length === 0) {
      return null;
    }
  
    return students.map(student => (
      <tr key={student.record_id} onClick={() => handleRowClick(student.record_id)}>
        <td><Link to={`/displayStudent/${student.record_id}`}>{student.record_id}</Link></td>
        <td>{student.first_name}</td>
        <td>{student.last_name}</td>
        <td>{student.gpa}</td>
        <td>{student.enrolled}</td>
      </tr>
    ));
  };
  

  return (
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>GPA</th>
          <th>Enrolled</th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </Table>
  );
}

export default ListStudents;
