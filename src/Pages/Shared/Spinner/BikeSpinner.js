import React from "react";
import { Spinner } from "react-bootstrap";

const BikeSpinner = ({ type }) => {
  return (
    <>
      <span className="common-spinner-container">
        <Spinner className="common-spinner" animation="border" variant={type} />
      </span>
    </>
  );
};

export default BikeSpinner;
