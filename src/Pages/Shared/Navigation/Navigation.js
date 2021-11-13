import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navigation.css";
import logo from "../../../img/logo.png";
import useAuth from "../../../Hooks/useAuth";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const history = useHistory();
  const { user, handleLogout } = useAuth();
  const location = useLocation();
  const path = location?.pathname;

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <header className={`${path === "/dashboard" ? "d-none" : "header"}`}>
      <div className="container">
        <nav className="bike-navbar">
          <div className="bike-nav-logo">
            <div className="d-flex align-items-center">
              <img src={logo} height="40" width="40" alt="logo" />
              <Link to="/" className="ms-2">
                Bike Valley
              </Link>
            </div>
            <div className="header-btn-container">
              <button
                className={`ham-btn ${showLinks && "btn-active"}`}
                onClick={() => setShowLinks(!showLinks)}
              >
                <GiHamburgerMenu />
              </button>
            </div>
          </div>
          <div className="bike-links-container" ref={linksContainerRef}>
            <ul className="bike-links" ref={linksRef}>
              <li className="bike-link-item">
                <Link to="/" onClick={() => setShowLinks(false)}>
                  Home
                </Link>
              </li>
              <li className="bike-link-item">
                <Link to="/explore" onClick={() => setShowLinks(false)}>
                  Explore
                </Link>
              </li>
              {user.displayName && (
                <li className="bike-link-item">
                  <Link to="/dashboard" onClick={() => setShowLinks(false)}>
                    Dashboard
                  </Link>
                </li>
              )}
              {user.displayName ? (
                <li className="bike-link-item">
                  <button
                    onClick={() => handleLogout(history)}
                    className="btn btn-danger fs-4"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="bike-link-item">
                  <Link to="/login" onClick={() => setShowLinks(false)}>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
