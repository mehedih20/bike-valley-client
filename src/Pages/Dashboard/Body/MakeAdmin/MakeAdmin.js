import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import CommonModal from "../../../Shared/CommonModal/CommonModal";

const MakeAdmin = () => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleModalClose = (data) => {
    if (data) {
      fetch(`https://bike-valley-server-three.vercel.appmakeAdmin/${email}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
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
        Make Admin
      </h1>
      <Container>
        <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 fs-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="p-3 fs-4"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className="fs-4 px-4" type="submit">
            Make Admin
          </Button>
        </Form>
        <CommonModal show={modalShow} onHide={handleModalClose} />
      </Container>
    </div>
  );
};

export default MakeAdmin;
