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
 
  return (
    <>
      <div className="container text-center">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <h1>Anime Movie Watchlist</h1>
            <p>Welcome to our incredible movie watchlist site! With our platform, users can search for any movie they desire and browse through both trending and latest anime movies to add to their personal watchlist. But that's not all! Our site offers an immersive movie experience where users can click on any movie card to learn more about the plot and other important details. Once you've added a movie to your watchlist, you can easily rate, comment, and provide input on whether you've seen the movie or not. Our platform is user-friendly and provides an exceptional user experience that will leave you wanting more. Join us today and start building your ultimate anime movie watchlist!</p>
            <p className="text-center">Register or Log in to proceed</p>

            <div className = "d-flex justify-content-between align-items-center mt-auto">
              <Link to="/login">
              <button className="btn btn btn-outline-secondary ">Login</button>
            </Link>

              <Link to="/register" >
              <button className="btn btn btn-secondary ">Register</button>
            </Link>
            </div>
         
          </div>
        </div>
      </div>
 
  </>
                  )}
