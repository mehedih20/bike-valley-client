import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import notFound from "../../img/notfound.png";

const NotFound = () => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center mb-5">
        <div className="w-75">
          <img src={notFound} alt="Not-Found" className="img-fluid" />
        </div>
        <Link to="/" className="btn btn-primary px-5 fs-3 mb-5">
          Back Home
        </Link>
      </Container>
    </>
  );
};

export default NotFound;
