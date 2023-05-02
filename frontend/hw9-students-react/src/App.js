import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Home from './pages/Home';
import Recommended from './pages/Recommended';
import SearchResults from './pages/SearchResults';
import Latest from './pages/Latest';
import Trending from './pages/Trending';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails';
import WatchlistMovieDetails from './pages/WatchlistMovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';
import { auth } from './firebase';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  const handleSearch = () => {
    // Your search functionality goes here
    setSearchQuery('');
  }

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/"> Anime Movie Watchlist</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
              <Nav.Link as={Link} to="/" className="ps-4">
                Home
              </Nav.Link>
              {currentUser && (
                <>
                  <Nav.Link as={Link} to="/Trending" className="ps-4">
                    Trending
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Latest" className="ps-4">
                    Latest
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Watchlist" className="ps-4">
                    Watchlist
                  </Nav.Link>
                </>
              )}
            </Nav>
            {currentUser && (
              <Form className="d-flex justify-content-around" >
                <Form.Control
                  type="search"
                  placeholder="Search for a Movie"
                  className="me-2 ps-2"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // style={{ width: "70%" }} // Set the width here
                />
                <Link to={`/SearchResults/?Film=${searchQuery}`}>
                  <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                </Link>
              </Form>
            )}
            {currentUser ? (
              <Nav className="ms-2">
                <Nav.Link as={Link} to="/" className="text-white" onClick={() => auth.signOut()}>
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ms-2">
                <Nav.Link as={Link} to="/Login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Register" className="text-white">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
       

        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Trending" element={<Trending />} />
        <Route path="/Latest" element={<Latest />} />
        <Route path="/Recommended/" element={<Recommended />} />
        <Route path="/Watchlist" element={<Watchlist />} />
        <Route path="/MovieDetails/:movieID" element={<MovieDetails />} />
        <Route path="WatchlistMovieDetails/:movieID" element={<WatchlistMovieDetails />} />
        <Route path="/SearchResults/:searchQuery?" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
