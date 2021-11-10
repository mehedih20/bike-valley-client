import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  IoLocationOutline,
  IoMailOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bike-footer bg-dark">
      <Container>
        <Row xs={1} sm={1} md={2} lg={3} className="text-light">
          <Col className="p-3 bike-address">
            <p>
              <span>
                <IoLocationOutline className="address-icon m-0" />
              </span>{" "}
              Wave, Via Habro Derennio 22/b 52100 Arezzo, Italy
            </p>
            <p>
              <span>
                <IoMailOutline className="address-icon" />
              </span>
              ask@example.com
            </p>
            <p>
              <span>
                <IoPhonePortraitOutline className="address-icon" />
              </span>
              095 1856 558 (Toll free)
            </p>
          </Col>
          <Col className="p-3 quick-links-container">
            <div>
              <h3 className="mb-4">Quick Links</h3>
              <div className="quick-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/explore">Explore</Link>
              </div>
            </div>
          </Col>
          <Col className="p-3">
            <h3 className="mb-4">Subscribe Us</h3>
            <div className="subscribe-input mb-4">
              <input type="email" placeholder="Your mail" />
              <button className="subscribe-btn">
                <AiOutlineArrowRight />
              </button>
            </div>
            <div className="d-flex">
              <a
                className="social-btn bg-primary"
                href="https://www.facebook.com"
              >
                <FaFacebookF />
              </a>
              <a className="social-btn bg-info" href="https://www.twitter.com">
                <FaTwitter />
              </a>
              <a
                className="social-btn bg-danger"
                href="https://www.instagram.com"
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
        <div className="text-center pt-5">
          <small className="text-muted">
            Copyright&copy; 2021 | All rights reserved | Bike Heaven
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
