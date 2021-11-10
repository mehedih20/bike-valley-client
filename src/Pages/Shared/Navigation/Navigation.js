import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navigation.css";
import logo from "../../../img/logo.png";

const Navigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <header className="header">
      <div className="container">
        <nav className="bike-navbar">
          <div className="bike-nav-logo">
            <div className="d-flex align-items-center">
              <img src={logo} height="30" width="30" alt="logo" />
              <Link to="/" className="ms-2">
                Bike Heaven
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
              <li className="bike-link-item">
                <Link to="/login" onClick={() => setShowLinks(false)}>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
