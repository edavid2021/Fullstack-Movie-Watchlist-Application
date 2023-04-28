import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';


function MovieDetails() {

    const [active, setActive] = useState(false);
    const [movies, setMovies] = useState([]);
    var [Watchlist, setWatchlist] = useState([]);

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
                        <img class="card-img-top" src="..." alt="Card image cap" />
                        <div class="card-body">
                            <div class="row">
                                <div class="col ">
                                    <h5 class="card-title">Card title</h5>
                                </div>
                                <div class="col ">Directed By</div>
                                <div class="col ">Release Date</div>
                            </div>

                            <div class="row">
                                <div class="col ">
                                   Genre 
                                </div>
                                <div class="col ">Ratings</div>
                              
                            </div>

                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>

                        <div class="row">
                            <div class="col ">
                                <button className="btn btn-outline-dark me-2">Back</button>
                            </div>
                            {/* <div class="col ">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MovieDetails;