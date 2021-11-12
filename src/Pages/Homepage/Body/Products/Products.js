import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import BikeSpinner from "../../../Shared/Spinner/BikeSpinner";
import { AiFillFire } from "react-icons/ai";
import "./Products.css";
import { useHistory } from "react-router";

const Products = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:5000/bikes")
      .then((res) => res.json())
      .then((data) => {
        const shortData = data.slice(0, 6);
        setBikes(shortData);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="py-5 mt-5 ">
      <h1 className="homepage-title text-secondary">Latest Bikes</h1>
      {loading && <BikeSpinner type="primary" />}
      <div className="bike-container">
        {bikes.map((bike) => {
          const { name, _id, price, status, img, brand } = bike;
          return (
            <div className="bike-box" key={_id}>
              <div className="bike-img">
                <img className="img-fluid" src={img} alt={name} />
              </div>
              <div className="bike-box-body">
                <h4 className="fs-2 text-primary">{name}</h4>
                <small className="text-muted mb-2">Brand: {brand}</small>
                <small className="text-muted mb-2">Status: {status}</small>
                <h4 className="fs-1 my-3 text-muted">
                  BDT <span className="text-danger">{price}</span>
                </h4>
                <Button
                  variant="primary"
                  className="fs-3 py-2 mt-3 font-cursive d-flex justify-content-center"
                  onClick={() => history.replace(`makeOrder/${_id}`)}
                >
                  Buy <AiFillFire className="text-warning fs-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Products;
