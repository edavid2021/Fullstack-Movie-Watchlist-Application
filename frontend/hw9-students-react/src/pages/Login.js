import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Row, Col } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="container my-5">
      <div className="card p-5">
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="form-group mb-4">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <Row className="mt-4 justify-content-between">
            <Col sm={12} md={6} className="mb-3 mb-md-0">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={(e) => {
                  e.preventDefault();
                  logInWithEmailAndPassword(email, password);
                }}
              >
                Login
              </button>
            </Col>
            <Col sm={12} md={6}>
              <button
                className="btn btn-danger btn-block"
                onClick={signInWithGoogle}
              >
                Login with Google
              </button>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-between">
            <Col xs={12} sm={6} className="mb-3 mb-sm-0">
              <Link to="/reset">Forgot Password</Link>
            </Col>
            <Col xs={12} sm={6}>
              <div className="text-sm-right">
                Don't have an account? <Link to="/register">Register</Link> now.
              </div>
            </Col>
          </Row>

        </form>
      </div>
    </div>
  );
}

export default Login;
