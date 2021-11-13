import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import CommonModal from "../../../Shared/CommonModal/CommonModal";
import BikeSpinner from "../../../Shared/Spinner/BikeSpinner";

const ManageOrder = () => {
  const [toggle, setToggle] = useState(false);
  const [aprroved, setApproved] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [requiredId, setRequiredId] = useState(null);

  const handleModalClose = (data) => {
    if (data && !aprroved) {
      fetch(`https://desolate-wave-42377.herokuapp.com/order/${requiredId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setToggle(!toggle);
          console.log(data.acknowledged);
        });
    }
    if (data && aprroved) {
      fetch(`https://desolate-wave-42377.herokuapp.com/order/${requiredId}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          setToggle(!toggle);
          console.log(data.acknowledged);
        });
    }
    setModalShow(false);
    setApproved(false);
  };

  const handleDelete = (id) => {
    setModalShow(true);
    setRequiredId(id);
  };

  const handleApprove = (id) => {
    setModalShow(true);
    setRequiredId(id);
    setApproved(true);
  };

  useEffect(() => {
    fetch("https://desolate-wave-42377.herokuapp.com/order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [toggle]);

  return (
    <div className=" overflow-auto mb-5 pb-5">
      <h1 className="text-center common-title text-secondary py-5">
        All Orders
      </h1>
      {loading && <BikeSpinner type="danger" />}
      <Container className="px-5">
        {orders.map((item) => {
          const { _id, img, order, price, email, status } = item;
          return (
            <Row key={_id} className="p-4 border rounded shadow mb-4">
              <Col lg={3} md={3}>
                <img height="100" className="mb-3" src={img} alt={order} />
              </Col>
              <Col lg={9} md={9}>
                <h4 className="font-cursive text-primary">{order}</h4>
                <p className="text-secondary">{email}</p>
                <p>BDT {price}</p>
                <p className="fs-5">
                  Status:{" "}
                  <span
                    className={`${
                      status === "pending" ? "text-danger" : "text-success"
                    }`}
                  >
                    {status}
                  </span>
                </p>
                <Button
                  variant="success"
                  onClick={() => handleApprove(_id)}
                  className={`fs-5 me-3 ${status !== "pending" && "d-none"}`}
                >
                  Approve
                </Button>
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

export default ManageOrder;
