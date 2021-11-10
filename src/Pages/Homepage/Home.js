import React from "react";
import Banner from "./Body/Banner/Banner";
import Brands from "./Body/Brands/Brands";
import Products from "./Body/Products/Products";
import Reviews from "./Body/Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Banner />
      <Products />
      <Reviews />
      <Brands />
    </>
  );
};

export default Home;
