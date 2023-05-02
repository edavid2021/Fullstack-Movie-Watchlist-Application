import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const WatchlistMovieDetails = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRating, setNewRating] = useState(null);
  const [newComments, setNewComments] = useState(null);
  const [newWatched, setNewWatched] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, watchlistResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
            params: {
              api_key: '8634de54298be041f009b7c918664433'
            }
          }),
          userId && axios.get(`https://movie-app-group20.herokuapp.com/users/${userId}/movies/${movieID}`) // check if userId is not null
        ]);
        setMovie({ ...movieResponse.data, ...watchlistResponse?.data }); // use optional chaining operator to safely access watchlistResponse
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits`, {
          params: {
            api_key: '8634de54298be041f009b7c918664433'
          }
        });
        setDirectors(creditsResponse.data.crew.filter((crew) => crew.job === 'Director'));
        setWriters(creditsResponse.data.crew.filter((crew) => crew.department === 'Writing'));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [movieID, userId]);

  const handleEditMovie = async () => {
    try {
      const response = await axios.put(`https://movie-app-group20.herokuapp.com/users/${userId}/movies/${movieID}`, {
        rating: newRating,
        comments: newComments,
        watched: newWatched
      });
      setMovie({ ...movie, rating: newRating, comments: newComments, watched: newWatched });
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const genres = movie.genres.map((genre) => genre.name).join(', ');

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} fluid />
        </Col>
        <Col md={8}>
          <div className="movie-details">
            <h1>{movie.title}</h1>
            <p><strong>Release date:</strong> {movie.release_date}</p>
            <p><strong>Genres:</strong> {genres}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Directors:</strong> {directors.map((director) => director.name).join(', ')}</p>
            <p><strong>Writers:</strong> {writers.map((writer) => writer.name).join(', ')}</p>
            {userId &&
              <>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Comments:</strong> {movie.comments}</p>
                <p><strong>Watched:</strong> {movie.watched ? 'Yes' : 'No'}</p>
                <Button onClick={() => setShowEditModal(true)}>Edit</Button>
              </>
            }
          </div>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" value={newRating} onChange={(e) => setNewRating(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={newComments} onChange={(e) => setNewComments(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Watched" checked={newWatched} onChange={(e) => setNewWatched(e.target.checked)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditMovie}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );}
export default WatchlistMovieDetails;
