import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaQuoteLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import "./Reviews.css";

const Reviews = () => {
  const [people, setPeople] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch("https://bike-valley-server-three.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data);
      });
  }, []);

  useEffect(() => {
    let lastValue = people.length - 1;
    if (value < 0) {
      setValue(lastValue);
    }
    if (value > lastValue) {
      setValue(0);
    }
  }, [people, value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="section reviews">
      <Container>
        <h2 className="homepage-title text-light">Reviews</h2>
        <div className="reviews-slider">
          {people.map((person, index) => {
            const { img, name, review, rating } = person;
            let position = "next-slide";
            if (index === value) {
              position = "active-slide";
            }
            if (
              index === value - 1 ||
              (value === 0 && index === people.length - 1)
            ) {
              position = "prev-slide";
            }

            return (
              <div className={`review-slide ${position}`} key={index}>
                <span className="slide-quotation">
                  <FaQuoteLeft />
                </span>
                <div className="slide-img">
                  <img src={img} alt={name} />
                </div>
                <div className="d-flex mt-4 mb-2">
                  {Array.apply(null, Array(rating)).map(function (_, i) {
                    return <AiFillStar className="text-warning" key={i} />;
                  })}
                </div>
                <h2>{name}</h2>
                {review?.length > 150 ? (
                  <p>{review.substring(0, 150)}...</p>
                ) : (
                  <p>{review}</p>
                )}
              </div>
            );
          })}
          <button
            className="review-btn btn-left"
            onClick={() => setValue(value - 1)}
          >
            <FaAngleLeft />
          </button>
          <button
            className="review-btn btn-right"
            onClick={() => setValue(value + 1)}
          >
            <FaAngleRight />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
