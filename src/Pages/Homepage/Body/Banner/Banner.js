import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "./Banner.css";
import banner2 from "../../../../img/banner-2.jpg";
import banner3 from "../../../../img/banner-3.jpg";
import banner4 from "../../../../img/banner-4.jpg";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <Carousel
        className="banner-carousel"
        controls={false}
        indicators={false}
        interval={5000}
        fade
      >
        <Carousel.Item className="carousel-picture">
          <img className="" src={banner4} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item className="carousel-picture">
          <img className="" src={banner2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item className="carousel-picture">
          <img className="" src={banner3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <div className="banner-text-container">
        <Container className="banner-text">
          <div className="d-flex flex-column">
            <h1>
              Welcome to <span className="text-danger">Bike</span> Valley!
            </h1>
            <h2>
              Don<span className="text-success">'</span>t wait
              <span className="text-success">...</span> <br />{" "}
              <span className="text-info">It's time to unleash the beast</span>
            </h2>
            <h4>Choose your best ride and fade away!</h4>
            <Link
              to="/explore"
              className="btn btn-danger fs-4 px-5 py-3 align-self-start banner-btn"
            >
              Explore
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Banner;
