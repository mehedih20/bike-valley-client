import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import CommonModal from "../../../Shared/CommonModal/CommonModal";
import BikeSpinner from "../../../Shared/Spinner/BikeSpinner";

const ManageProducts = () => {
  const [toggle, setToggle] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bikes, setBikes] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const handleModalClose = (data) => {
    if (data) {
      fetch(`https://desolate-wave-42377.herokuapp.com/bikes/${deleteId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setToggle(!toggle);
          console.log(data.acknowledged);
        });
    }
    setModalShow(false);
  };

  const handleDelete = (id) => {
    setModalShow(true);
    setDeleteId(id);
  };

  useEffect(() => {
    fetch("https://desolate-wave-42377.herokuapp.com/bikes")
      .then((res) => res.json())
      .then((data) => {
        setBikes(data);
        setLoading(false);
      });
  }, [toggle]);

  return (
    <div className="overflow-auto mb-5 pb-5">
      <h1 className="text-center common-title text-secondary py-5">
        All Products
      </h1>
      {loading && <BikeSpinner type="danger" />}
      <Container className="px-5">
        {bikes.map((item) => {
          const { _id, img, name, price, brand } = item;
          return (
            <Row key={_id} className="p-4 border rounded shadow mb-4">
              <Col lg={3} md={3}>
                <img height="100" src={img} alt={name} />
              </Col>
              <Col lg={9} md={9}>
                <h4 className="font-cursive text-primary">{name}</h4>
                <p>BDT {price}</p>
                <p className="text-secondary">{brand}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(_id)}
                  className="fs-5"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          );
        })}
        <CommonModal show={modalShow} onHide={handleModalClose} />
      </Container>
    </div>
  );
};

export default ManageProducts;
