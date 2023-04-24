import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMovies(page) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=8634de54298be041f009b7c918664433&sort_by=popularity.desc&with_genres=16&with_original_language=ja&page=${page}`
      );
      const data = await response.json();
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
            {movies.map((movie) => (
              <div className="col" key={movie.id}>
                <div className="card h-100">
                  <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                    <p className="card-text">
                      <small className="text-muted">{movie.release_date}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
