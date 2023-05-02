import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SearchResults() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [active, setActive] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);
  const url = window.location.href;
  const result = url.slice(42).replace(/%20/g, " ");

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (userId) { // only fetch if userId is not null
        const response = await axios.get(`http://localhost:5678/users/${userId}/movie_list`);
        setWatchlist(response.data);
        console.log(response.data);
      }
    };
    fetchWatchlist();
  }, [userId]);
  function fetchMovies() {
    var send = {
      query: result
    };
    const backend = 'http://localhost:5678/search';

    axios.post(backend, send).then((res) => {
      const { data } = res;
      setMovies(data.results);
    }).catch((err) => {
      alert(err);
    });
  }

  useEffect(() => {
    fetchMovies();
    const params = new URLSearchParams(location.search);
    const query = params.get('Film') || '';
    setSearchQuery(query);
  }, [location.search]);

  function addWatchlist(event) {
    event.preventDefault();
    var id = parseInt(event.target.id);
    const payload = {
      movie_id: id,
      rating: null,
      comments: null,
      watched: false
    };
    fetch(`http://localhost:5678/users/${userId}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setWatchlist([...watchlist, { movie_id: id }]);
      console.log(watchlist);
      alert(data.message);
    })
    .catch(error => console.error(error));
    
    // Disable button after click
    event.target.disabled = true;
  }
  
  
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
      setWatchlist(watchlist.filter(item => item.movie_id !== id));
      alert(data.message);
    })
    .catch(error => console.error(error));
  }

  return (
    <>
      <section className="section p-3 bg-light border-bottom border-2 border-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="text-center">Search Results</h3>
  
         
        </div>
      </section>
      <section className="section p-3 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {movies.map((movie) => (
              <div className="col d-flex" key={movie.id}>
                <Link to={`/MovieDetails/${movie.id}`} className="movie-link">
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview.substring(0, 100)}...</p>
  
                      <div class="d-flex justify-content-between align-items-center mt-auto">
                        <p class="card-text">
                          <small class="text-muted">
                            {movie.release_date}
                          </small>
                        </p>
                        {watchlist.some(item => item.movie_id === movie.id) ?
                            <button
                              id={movie.id}
                              variant="secondary"
                              size="md"
                              onClick={() => deleteWatchlist(movie.id)}
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section p-3 bg-light border-bottom border-2 border-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <div></div>
        </div>
      </section>
    </>
  );
  
}
