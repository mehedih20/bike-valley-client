import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { useHistory, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const {
    emailLogin,
    createNewUser,
    formMsg,
    setFormMsg,
    isLoading,
    setIsLoading,
    googleSignIn,
    setUser,
    createDataUser,
  } = useAuth();
  const [isUser, setIsUser] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setFormMsg("Password must be at least 6 characters!");
      return;
    } else {
      if (isUser && email && password) {
        emailLogin(email, password)
          .then((result) => {
            const person = result.user;
            setIsLoading(false);
            if (person.emailVerified) {
              const dataUser = {
                name: person.displayName,
                email: person.email,
              };
              createDataUser(dataUser);
              setUser(person);
              history.push(from);
            } else {
              setFormMsg("Please verify your email!");
            }
          })
          .catch((error) => {
            setFormMsg(error.message);
            setIsLoading(false);
          });
      } else if (!isUser && email && password) {
        createNewUser(email, password, username);
      }
      setIsLoading(true);
      setFormMsg("");
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  const handleLoginCheck = () => {
    setIsUser(!isUser);
    if (formMsg) {
      setFormMsg("");
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn(history, from);
  };

  return (
    <div className="login-container">
      <Container className="d-flex justify-content-center">
        <div className="login">
          <h2 className="common-title text-secondary mb-3">
            {isUser ? "Login" : "Sign Up"}
          </h2>
          <form className="login-form" onSubmit={handleSubmit}>
            {!isUser && (
              <input
                type="text"
                placeholder="Name"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="text-warning mb-3">{formMsg}</small>

            {isLoading ? (
              <button type="submit" className="btn btn-primary px-5">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button type="submit" className="btn btn-danger fs-4 px-5">
                {isUser ? "Login" : "Sign Up"}
              </button>
            )}
          </form>
          <div className="d-flex align-items-center m-5">
            <p className="text-muted m-0">
              {isUser ? "Don't have a account?" : "Already have an account?"}
            </p>
            <button className="login-check-btn ms-2" onClick={handleLoginCheck}>
              {isUser ? "Sign up" : "Login"}
            </button>
          </div>
          <Button
            variant="outline-primary"
            className="d-flex fs-4 align-items-center"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="me-1" />{" "}
            {isUser ? "Google Login" : "Google Sign Up"}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
