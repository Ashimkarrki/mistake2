import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import img1 from "../Photo.png";

const imgurl = "https://image.tmdb.org/t/p/w500";

const Creditmember = (data) => {
  const items = data.castinfo.cast?.map((data) => {
    return (
      <div className="cast" key={data.credit_id}>
        <img
          src={data.profile_path ? imgurl + data.profile_path : img1}
          alt={data.original_name}
        />
        <h5>{data.original_name}</h5>
        <h5>{data.known_for_department}</h5>
      </div>
    );
  });
  const responsive = {
    0: {
      items: 7,
    },
    512: {
      items: 7,
    },
  };

  return (
    <AliceCarousel
      responsive={responsive}
      disableDotsControls
      mouseTracking
      autoPlay
      disableButtonsControls
      infinite
      items={items}
    />
  );
};
export default Creditmember;
