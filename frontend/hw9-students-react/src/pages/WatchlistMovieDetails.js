import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col, Image } from 'react-bootstrap';


export default function WatchlistMovieDetails() {

    const [active, setActive] = useState(false);
    var [Watchlist, setWatchlist] = useState([]);
    const { movieID } = useParams();
    const [movie, setMovie] = useState(null);
    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);

    function addWatchlist(event) {
        event.preventDefault();
        var id = parseInt(event.target.id);
        setWatchlist([...Watchlist, id]);
        console.log(Watchlist);

    }

    function deleteWatchlist(event) {
        event.preventDefault();
        var id = parseInt(event.target.id);
        setWatchlist(Watchlist.filter(item => item !== id));
        console.log(Watchlist);
    }

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
                    params: {
                        api_key: '8634de54298be041f009b7c918664433'
                    }
                });
                setMovie(response.data);

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
    }, [movieID]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const genres = movie.genres.map((genre) => genre.name).join(', ');


    return (
        <>
            <section className="section p-3 bg-light border-bottom border-2 border-dark" >
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 className="text-center">Movie Details</h3>
                </div>
            </section>
            <section className="section p-3 bg-light border-bottom border-2 border-dark vh-100">
                <div class="container">
                    <div class="card mb-3">
                        <img
                            className="card-img-top img-fluid"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div class="card-body">
                            <div class="row">
                                <div class="col ">
                                    <h5 class="card-title">{movie.title}</h5>
                                </div>
                                <div class="col ">Directors: {directors.map((director) => director.name).join(', ')}</div>
                                <div class="col ">Release Date: {movie.release_date}</div>
                            </div>

                            <div class="row">
                                <div class="col ">
                                    {genres}
                                </div>
                                <div class="col ">Rating: {movie.vote_average}/10 ({movie.vote_count} votes)</div>

                            </div>

                            <p class="card-text pt-4">{movie.overview}</p>
                            <p class="card-text"><small class="text-muted">Runtime: {movie.runtime} minutes</small></p>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <div class="col ">
                                <button className="btn btn-outline-dark me-2">Back</button>
                            </div>
                            <div class="col ">
                                {Watchlist.includes(movie.id) ?
                                    <button
                                        id={movie.id}
                                        variant="secondary"
                                        size="md"
                                        onClick={deleteWatchlist}
                                        aria-pressed={active}
                                        className="btn btn-secondary"
                                    >
                                        Unadd
                                    </button>
                                    :
                                    <button
                                        id={movie.id}
                                        variant="outline-secondary"
                                        size="md"
                                        onClick={addWatchlist}
                                        aria-pressed={active}
                                        className="btn btn-outline-secondary"
                                    >
                                        Watchlist
                                    </button>
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

