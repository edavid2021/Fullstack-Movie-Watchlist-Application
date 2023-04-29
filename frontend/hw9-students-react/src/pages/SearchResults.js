import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



export default function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [active, setActive] = useState(false);
  var [Watchlist, setWatchlist] = useState([]);


  useEffect(() => {
    async function fetchMovies(page) {
      const response = await axios.get(`http://localhost:5678/search?page=${page}`);
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
      <section className="section p-3 bg-light border-bottom border-2 border-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="text-center">Search Results</h3>

          <div className="justify-content-md-end">
            {renderPagination()}
          </div>
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
                </Link>


              </div>
            ))}
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
