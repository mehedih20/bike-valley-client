import React from "react";
import { Container } from "react-bootstrap";
import "./Brands.css";
import brand1 from "../../../../img/brands/brand-1.jpg";
import brand2 from "../../../../img/brands/brand-2.jpg";
import brand3 from "../../../../img/brands/brand-3.jpg";
import brand4 from "../../../../img/brands/brand-4.jpg";
import brand5 from "../../../../img/brands/brand-5.jpg";
import brand6 from "../../../../img/brands/brand-6.jpg";
import brand7 from "../../../../img/brands/brand-7.jpg";
import brand8 from "../../../../img/brands/brand-8.jpg";

const brandsData = [
  {
    img: brand1,
    name: "TVS",
  },
  {
    img: brand2,
    name: "Ducati",
  },
  {
    img: brand3,
    name: "Harley Davidson",
  },
  {
    img: brand4,
    name: "Hero",
  },
  {
    img: brand5,
    name: "Honda",
  },
  {
    img: brand6,
    name: "Kawasaki",
  },
  {
    img: brand7,
    name: "Suzuki",
  },
  {
    img: brand8,
    name: "Yamaha",
  },
];

const Brands = () => {
  return (
    <Container className="brands section">
      <h2 className="homepage-title text-secondary">Top Brands</h2>
      <div className="brands-container">
        {brandsData.map((brand, index) => {
          const { img, name } = brand;
          return (
            <div className="brand-box" key={index}>
              <img src={img} alt={name} />
              <p>{name}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Brands;
