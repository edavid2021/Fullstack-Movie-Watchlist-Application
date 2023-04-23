import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function Recommended() {
  
  return (
    <>
      <section className="section p-3 bg-light border-bottom border-2 border-dark" >
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 className="text-center">Recommended</h3>
                
                <div className="justify-content-md-end">
                    <button className="btn btn-outline-dark me-2">1</button>
                    <button className="btn btn-outline-dark me-2">2</button>
                    <button className="btn btn-outline-dark">3</button>
                </div>
                </div> 
            </section>
            <section className="section p-3 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                        </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 pt-4">
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                        </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                        <img class="card-img-top" src="..." alt="Card image cap"/>
                        <div class="card-body">
                            <h5 class="card-title">Movie title</h5>
                            <p class="card-text">Movie Description</p>
                            <p class="card-text"><small class="text-muted">Release Date</small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
    </>
  );
}

export default Recommended;
