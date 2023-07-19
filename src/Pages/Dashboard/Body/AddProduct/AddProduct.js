import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import CommonModal from "../../../Shared/CommonModal/CommonModal";

const AddProduct = () => {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [bikeImg, setBikeImg] = useState("");

  const reset = () => {
    setPrice("");
    setName("");
    setBrand("");
    setBikeImg("");
    setStatus("");
  };

  const handleModalClose = (data) => {
    const productData = {
      name,
      brand,
      price: parseInt(price),
      status,
      img: bikeImg,
    };

    if (data) {
      fetch("https://bike-valley.onrender.com/bikes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((res) => res.json())
        .then((data) => {
          reset();
          console.log(data.acknowledged);
        });
    }
    setModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <div>
      <h1 className="text-center text-secondary py-5 common-title">
        Add Product
      </h1>
      <Container>
        <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 fs-3">
            <Form.Control
              className="p-3 fs-4"
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 fs-3">
            <Form.Control
              className="p-3 fs-4"
              type="text"
              placeholder="Image URL"
              value={bikeImg}
              onChange={(e) => setBikeImg(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 fs-3">
            <Form.Control
              className="p-3 fs-4"
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 fs-3">
            <Form.Control
              className="p-3 fs-4"
              type="text"
              placeholder="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 fs-3">
            <Form.Control
              className="p-3 fs-4"
              type="text"
              placeholder="Product brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="fs-4 px-4" type="submit">
            Add Product
          </Button>
        </Form>
        <CommonModal show={modalShow} onHide={handleModalClose} />
      </Container>
    </div>
  );
};

export default AddProduct;
