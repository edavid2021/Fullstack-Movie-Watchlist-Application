import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';

function Watchlist() {
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    async function fetchWatchlist() {
      if (userId) {
        const response = await axios.get(`http://localhost:5678/users/${userId}/movie_list`);
        const watchlist = response.data;
        setWatchlist(watchlist);
      }
    }
    fetchWatchlist();
  }, [userId]);

  useEffect(() => {
    async function fetchMovies() {
      const movies = await Promise.all(
        watchlist.map(async item => {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${item.movie_id}`, {
            params: {
              api_key: '8634de54298be041f009b7c918664433',
              language: 'en-US'
            }
          });
          return response.data;
        })
      );
      setMovies(movies);
    }
    fetchMovies();
  }, [watchlist]);

  function deleteWatchlist(id) {
    fetch(`http://localhost:5678/users/${userId}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(data.message);
      setMovies(movies.filter(movie => movie.id !== id)); // update movies state
    })
    .catch(error => console.error(error));
  }
  

  return (
    <>
    <section className="section p-3 bg-light border-bottom border-2 border-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <h3>Your Watchlist</h3>
      </div>
    </section>
    <section className="section p-3 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {movies.map((movie) => {
            return (
              <div className="col d-flex" key={movie.id}>
                <Link to={`/WatchlistMovieDetails/${movie.id}`} className="movie-link">
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <p className="card-text">
                          <small className="text-muted">
                            {movie.release_date}
                          </small>
                        </p>
                        <button
                          id={movie.id}
                          variant="secondary"
                          size="md"
                          onClick={(event) => { event.preventDefault(); deleteWatchlist(movie.id) }}
                          className="btn btn-secondary"
                        >
                          Unadd
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>
  );}  

export default Watchlist;
