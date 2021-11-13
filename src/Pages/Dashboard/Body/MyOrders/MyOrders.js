import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import useAuth from "../../../../Hooks/useAuth";
import CommonModal from "../../../Shared/CommonModal/CommonModal";
import BikeSpinner from "../../../Shared/Spinner/BikeSpinner";

const MyOrders = () => {
  const [toggle, setToggle] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth();

  const handleModalClose = (data) => {
    if (data) {
      fetch(`http://localhost:5000/order/${deleteId}`, {
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
    fetch(`http://localhost:5000/order/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [toggle]);

  return (
    <div className=" overflow-auto">
      <h1 className="text-center common-title text-secondary py-5">
        My Orders
      </h1>
      {loading && <BikeSpinner type="danger" />}
      <Container className="px-5">
        {orders.map((item) => {
          const { _id, img, order, price } = item;
          return (
            <Row key={_id} className="p-4 border rounded shadow mb-4">
              <Col lg={3} md={3}>
                <img height="100" src={img} alt={order} />
              </Col>
              <Col lg={9} md={9}>
                <h4 className="font-cursive text-primary">{order}</h4>
                <p>BDT {price}</p>
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

export default MyOrders;
