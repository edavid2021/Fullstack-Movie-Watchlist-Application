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
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <h1>Welcome to my App</h1>
            <p>This is a simple app that allows you to do X, Y and Z. It's easy to use and provides a great user experience.</p>
            <p>Use the navigation bar to explore the different features of the app. If you have any questions or need help, please <Link to="/contact">contact us</Link>.</p>
          </div>
        </div>
      </div>
 
  
   
  </>
                  )}
