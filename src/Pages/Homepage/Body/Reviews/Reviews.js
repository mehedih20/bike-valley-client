import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight, FaQuoteLeft } from "react-icons/fa";

import "./Reviews.css";

const reviewData = [
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
  {
    name: "Alex",
    img: "https://image.freepik.com/free-photo/smart-man-with-phone-his-ear_1262-728.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta maxime ad quibusdam. Blanditiis, exercitationem laudantium consequuntur ipsa saepe aliquam suscipit.",
  },
];

const Reviews = () => {
  const [people, setPeople] = useState(reviewData);
  const [value, setValue] = useState(0);

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
            const { img, name, description } = person;

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
                <h2>{name}</h2>
                {description?.length > 150 ? (
                  <p>{description.substring(0, 150)}...</p>
                ) : (
                  <p>{description}</p>
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
