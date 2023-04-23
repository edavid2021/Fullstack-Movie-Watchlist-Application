import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';

function LoginRegister() {

  return (
    <>
      <section className="section p-3 bg-light border-bottom border-2 border-dark" >
                <div className="container d-flex justify-content-between align-items-center">
                    <h3 className="text-center">Login</h3>
                </div> 
            </section>
    </>
  );
}

export default LoginRegister;
