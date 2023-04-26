import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Badge } from 'react-bootstrap';
import axios from 'axios';

const MovieDetails = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
          params: {
            api_key: '8634de54298be041f009b7c918664433'
          }
        });
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} fluid/>
        </Col>
        <Col md={8}>
          <div className="movie-details">
            <h1>{movie.title}</h1>
            <p>
              <Badge pill variant="secondary">{movie.release_date.split('-')[0]}</Badge>
              &nbsp;
              {movie.genres.map((genre, index) => (
                <Badge key={index} pill variant="secondary">{genre.name}</Badge>
              ))}
              &nbsp;&nbsp;
              {movie.production_countries.map((country, index) => (
                <span key={index}>{country.iso_3166_1}</span>
              ))}
              &nbsp;&nbsp;
              <Badge pill variant="secondary">{movie.runtime} min</Badge>
            </p>
            <p>{movie.overview}</p>
            <p>
              <strong>Director:</strong> {movie.credits.crew.find((crew) => crew.job === 'Director').name}
            </p>
            <p>
              <strong>Stars:</strong> {movie.credits.cast.slice(0, 3).map((cast, index) => (
                <span key={index}>{cast.name}&nbsp;</span>
              ))}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
              &nbsp;&nbsp;
              <span className="text-muted">{movie.vote_count} votes</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
