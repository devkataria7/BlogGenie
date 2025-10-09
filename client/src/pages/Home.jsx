import React from "react";
import Header from "../components/Header";
import Bloglist from "../components/Bloglist";
import Newsletter from "../components/Newsletter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
