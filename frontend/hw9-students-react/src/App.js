import React, { useState } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Home from './pages/Home';
import ListStudents from './pages/ListStudents';
import DisplayStudent from './pages/DisplayStudent';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';
import DeleteStudent from './pages/DeleteStudent';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Your search functionality goes here
    setSearchQuery('');
  }

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Students</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/ListStudents">
                Students
              </Nav.Link>
              <Nav.Link as={Link} to="/addStudent">
                Add Student
              </Nav.Link>
            </Nav>
            <Form className="d-flex" >
              <Form.Control
                type="search"
                placeholder="Enter Last Name"
                className="me-2"
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link to={`/ListStudents/?lastName=${searchQuery}`}>
                <Button variant="outline-success" onClick={handleSearch}>Search</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ListStudents" element={<ListStudents />} />
        <Route path="/displayStudent/:id" element={<DisplayStudent />} />
        <Route path="/addStudent/" element={<AddStudent />} />
        <Route path="/updateStudent/:id" element={<UpdateStudent />} />
        <Route path="/deleteStudent/:id" element={<DeleteStudent />} />
        <Route path="/ListStudents/:searchQuery?" element={<ListStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
