import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import BikeSpinner from "../Shared/Spinner/BikeSpinner";
import OrderModal from "./OrderModal";

const MakeOrder = () => {
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState({});
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const { bikeId } = useParams();
  const { user } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderLoading(true);

    const finalOrder = {
      status: "pending",
      name: user.displayName,
      email: user.email,
      order: product.name,
      img: product.img,
      price: product.price,
      address,
      number,
    };

    fetch("https://desolate-wave-42377.herokuapp.com/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finalOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setOrderLoading(false);
          setModalShow(true);
        }
      });
  };

  const handleModalClose = () => {
    setModalShow(false);
    history.replace("/dashboard/myOrders");
  };

  useEffect(() => {
    fetch(`https://desolate-wave-42377.herokuapp.com/bikes/${bikeId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <h1 className="common-title text-secondary my-5">Make Order</h1>
      {loading && <BikeSpinner type="danger" />}
      {!loading && (
        <Form className="w-75 mx-auto fs-4 mb-5 pb-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              value={user.displayName}
              disabled
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              value={user.email}
              disabled
              type="email"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput3">
            <Form.Label>Your address</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              type="text"
              required
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput4">
            <Form.Label>Your number</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              type="text"
              required
              placeholder="123 456 789"
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput5">
            <Form.Label>Order</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              value={product.name}
              disabled
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput6">
            <Form.Label>Price</Form.Label>
            <Form.Control
              className="fs-4 p-2"
              value={product.price}
              disabled
              type="text"
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="fs-4 py-2 px-5 mt-3 mb-5"
          >
            {orderLoading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Confirm Order"
            )}
          </Button>
        </Form>
      )}
      <OrderModal show={modalShow} onHide={handleModalClose} />
    </Container>
  );
};

export default MakeOrder;
