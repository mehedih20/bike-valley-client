import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import useAuth from "../../../../Hooks/useAuth";
import ReviewModal from "./ReviewModal";

const Review = () => {
  const [modalShow, setModalShow] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const { user } = useAuth();

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviewLoading(true);
    if (rating <= 5 && review) {
      const newReview = {
        name: user.displayName,
        rating: parseInt(rating),
        img: "https://i.ibb.co/CQQNZt5/user-128.png",
        review,
      };
      fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newReview),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setRating("");
            setReview("");
            setReviewLoading(false);
            setModalShow(true);
          }
        });
    }
  };
  return (
    <div>
      <h1 className="text-center common-title py-5 text-secondary">Review</h1>
      <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            className="p-3 fs-4"
            type="text"
            value={rating}
            placeholder="(Out of 5)"
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your Review</Form.Label>
          <Form.Control
            onChange={(e) => setReview(e.target.value)}
            as="textarea"
            value={review}
            rows={5}
            className="fs-4"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="fs-4 py-2 px-4">
          {reviewLoading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
      <ReviewModal show={modalShow} onHide={handleModalClose} />
    </div>
  );
};

export default Review;
