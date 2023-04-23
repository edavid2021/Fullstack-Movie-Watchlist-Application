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

    return (
        <>
           <section className="section p-3 bg-light border-bottom border-2 border-dark" >
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 className="text-center">Movie Details</h3>
                </div> 
            </section> 
        </>
    );
}

export default MovieDetails;