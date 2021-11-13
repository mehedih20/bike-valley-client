import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { AiFillFire } from "react-icons/ai";
import BikeSpinner from "../Shared/Spinner/BikeSpinner";
import "./Explore.css";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("https://desolate-wave-42377.herokuapp.com/bikes")
      .then((res) => res.json())
      .then((data) => {
        setBikes(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="explore">
      <Container>
        <h2 className="display-4 text-center text-light">
          Explore Our Collection
        </h2>
        {loading && <BikeSpinner type="primary" />}
        <div className="bike-container mt-5">
          {bikes.map((bike) => {
            const { name, _id, price, status, img, brand } = bike;
            return (
              <div className="explore-box" key={_id}>
                <div className="explore-box-img">
                  <img className="img-fluid" src={img} alt={name} />
                </div>
                <div className="explore-box-body">
                  <h4 className="fs-2 text-primary font-cursive">{name}</h4>
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
    </div>
  );
};

export default Explore;
