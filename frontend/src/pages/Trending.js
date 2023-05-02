import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [active] = useState(false);
  const [user] = useAuthState(auth);
  const [userId, setUserId] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (userId) { // only fetch if userId is not null
        const response = await axios.get(`https://movie-app-group20.herokuapp.com/users/${userId}/movie_list`);
        setWatchlist(response.data);
        console.log(response.data);
      }
    };
    fetchWatchlist();
  }, [userId]);
  useEffect(() => {
    async function fetchMovies(page) {
      const response = await axios.get(`https://movie-app-group20.herokuapp.com/trending?page=${page}`);
      const { data } = response;
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
    fetchMovies(currentPage);
  }, [currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function renderPagination() {
    const PAGE_RANGE_DISPLAYED = 5;
    const MARGIN_PAGES_DISPLAYED = 1;
    let pagination = [];

    if (totalPages <= PAGE_RANGE_DISPLAYED) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(
          <button
            key={i}
            className={`btn btn-outline-dark me-2 ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      let leftSide = currentPage - Math.floor(PAGE_RANGE_DISPLAYED / 2);
      let rightSide = currentPage + Math.floor(PAGE_RANGE_DISPLAYED / 2);

      if (leftSide < MARGIN_PAGES_DISPLAYED + 1) {
        leftSide = MARGIN_PAGES_DISPLAYED + 1;
        rightSide = PAGE_RANGE_DISPLAYED;
      }

      if (rightSide > totalPages - MARGIN_PAGES_DISPLAYED) {
        leftSide = totalPages - PAGE_RANGE_DISPLAYED + 1;
        rightSide = totalPages - MARGIN_PAGES_DISPLAYED;
      }

      pagination.push(
        <button
          key={1}
          className={`btn btn-outline-dark me-2 ${1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          {1}
        </button>
      );

      if (leftSide > MARGIN_PAGES_DISPLAYED + 1) {
        pagination.push(
          <span key="leftEllipsis" className="me-2">
            ...
          </span>
        );
      }

      for (let i = leftSide; i <= rightSide; i++) {
        pagination.push(
          <button
            key={i}
            className={`btn btn-outline-dark me-2 ${i === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      if (rightSide < totalPages - MARGIN_PAGES_DISPLAYED) {
        pagination.push(
          <span key="rightEllipsis" className="me-2">
            ...
          </span>
        );
      }

      pagination.push(
        <button
          key={totalPages}
          className={`btn btn-outline-dark me-2 ${totalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return <div>{pagination}</div>;
  }

  function addWatchlist(event) {
    event.preventDefault();
    var id = parseInt(event.target.id);
    const payload = {
      movie_id: id,
      rating: null,
      comments: null,
      watched: false
    };
    fetch(`https://movie-app-group20.herokuapp.com/users/${userId}/movies`, {
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
      alert(data.message);
    })
    .catch(error => console.error(error));
    
    // Disable button after click
    event.target.disabled = true;
  }
  
  
  function deleteWatchlist(id) {
    fetch(`https://movie-app-group20.herokuapp.com/users/${userId}/movies/${id}`, {
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
    <h3 className="text-center">Trending</h3>

    <div className="justify-content-md-end">
      {renderPagination()}
    </div>
  </div>
</section>
<section className="section p-3 bg-light">
  <div className="container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
      {movies.map((movie) => {
        return (
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

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <p className="card-text">
                      <small className="text-muted">
                        {movie.release_date}
                      </small>
                    </p>
                    {user && (
                    <>
                      {watchlist.some(item => item.movie_id === movie.id) ?
                        <button
                          id={movie.id}
                          variant="secondary"
                          size="md"
                          onClick={(event) => { event.preventDefault(); deleteWatchlist(movie.id) }}
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
                          onClick={(event) => addWatchlist(event)}
                          aria-pressed={active}
                          className="btn btn-outline-secondary"
                        >
                          Watchlist
                        </button>
                      }
                    </>
                  )}


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
<section className="section p-3 bg-light border-bottom border-2 border-dark">
  <div className="container d-flex justify-content-between align-items-center">
    <div></div>

    <div className="justify-content-md-end">
      {renderPagination()}
    </div>
  </div>
</section>

    </>
  );
}
