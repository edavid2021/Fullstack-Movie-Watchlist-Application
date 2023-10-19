import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const MovieDetails = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
          params: {
            api_key: '390a76f3f6630c9f04cfcffd385d4cfd'
          }
        });
        setMovie(response.data);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits`, {
          params: {
            api_key: '390a76f3f6630c9f04cfcffd385d4cfd'
          }
        });
        setDirectors(creditsResponse.data.crew.filter((crew) => crew.job === 'Director'));
        setWriters(creditsResponse.data.crew.filter((crew) => crew.department === 'Writing'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieID]);

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
            <div className="genres">{genres}</div>
            <p>{movie.overview}</p>
            <div className="row">
              <div className="col-sm-6">
                <p>Release date: {movie.release_date}</p>
                <p>Runtime: {movie.runtime} minutes</p>
                <p>Rating: {movie.vote_average}/10 ({movie.vote_count} votes)</p>
              </div>
              <div className="col-sm-6">
                <p>Directors: {directors.map((director) => director.name).join(', ')}</p>
                <p>Writers: {writers.map((writer) => writer.name).join(', ')}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
