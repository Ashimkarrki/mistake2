import React from "react";
import Nav from "./Nav";
import Quesans from "./Quesans";
import img from "./backgroundimg.jpg";
const Banner = () => {
  return (
    <div className="bannerbar" style={{ background: `url(${img})` }}>
      <Nav />
      <div className="hero-text">
        <h1>MOVIE+REVIEW...</h1>
        <h3>
          Here, you can review movies and communicate with others, and make
          friends
        </h3>
        <button>Registernow</button>
      </div>
      <Quesans />
    </div>
  );
};

export default Banner;
