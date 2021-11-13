import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <div style={{ height: "100vh", overflowX: "hidden" }}>
      <div className="bg-dark px-5 py-4 d-flex justify-content-between">
        <Button onClick={() => setShowNav(!showNav)} variant="light">
          Toggle
        </Button>
        <h2 className="text-light">Dashboard</h2>
      </div>
      <Row className="h-100">
        <Col className="bg-secondary" lg={`${showNav ? 2 : 3}`}>
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </Col>
        <Col lg={`${showNav ? 10 : 9}`}>Body</Col>
      </Row>
    </div>
  );
};

export default Dashboard;
