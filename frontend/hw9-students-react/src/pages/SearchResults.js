import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
function SearchResults() {

  return (
    <>
    <section className="section p-3 bg-light border-bottom border-2 border-dark" >
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 className="text-center">Search Results</h3>
                
                <div className="justify-content-md-end">
                    <button className="btn btn-outline-dark me-2">1</button>
                    <button className="btn btn-outline-dark me-2">2</button>
                    <button className="btn btn-outline-dark">3</button>
                </div>
                </div> 
            </section>
    </>

  );
}

export default SearchResults;
