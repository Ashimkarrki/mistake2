import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Creditmember from "../movie_feature_from_single_page/Creditmember";

const imgurl = "https://image.tmdb.org/t/p/w1280";
const key = "af3abab3867f0ddb9831952933244908";
const Moviedata = ({ moviedata, fetchingdataa }) => {
  const [othermovieinfo, setothermovieinfo] = useState({});
  const [castinfo, setcastinfo] = useState({});
  const [images, setimages] = useState([]);
  const [trailerURL, settrailerURL] = useState("");
  const location = useLocation();
  const pathid = location.pathname.split("/")[1];
  const pathsecondid = location.pathname.split("/")[2];
  const paththirdid = location.pathname.split("/")[3];
  const result = paththirdid.replaceAll("%20", " ");
  console.log(result);
  const [toggle, settoggle] = useState(true);
  console.log(pathid);
  const data = moviedata.filter((data) => data.id == pathid);
  //console.log(data[0]?.id);

  const fetchingdata = async () => {
    //  console.log(data[0]);
    const respond_from_api = await fetch(
      `https://api.themoviedb.org/3/${pathsecondid}/${pathid}?api_key=${key}&language=en-US`
    );
    // console.log(respond_from_api)
    const Mdatas = await respond_from_api.json();
    const respond_for_cast = await fetch(
      `https://api.themoviedb.org/3/${pathsecondid}/${pathid}/credits?api_key=${key}&language=en-US`
    );

    const Mdata = await respond_for_cast.json();

    setothermovieinfo(Mdatas);
    setcastinfo(Mdata);
  };

  useEffect(() => {
    fetchingdata();
    settoggle(false);
  }, [location]);

  console.log(othermovieinfo);
  // console.log(data[0]);
  const opts = {
    height: "640",
    width: "1040",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  useEffect(() => {
    settrailerURL("");

    movieTrailer(result)
      .then((url) => {
        //console.log(url);
        const urll = new URLSearchParams(new URL(url).search);
        settrailerURL(urll.get("v"));
        //console.log(trailerURL);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="movie_info_box">
      <div className="classes">
        <img src={imgurl + othermovieinfo?.backdrop_path} />
        <div className="info">
          <h3>
            {othermovieinfo?.original_title || othermovieinfo?.original_name}
          </h3>
          <p>
            <span>RELASE DATE: </span>
            {othermovieinfo?.release_date}
          </p>
          <p>
            <span>ORIGINAL LANGUAGE: </span>
            {othermovieinfo?.original_language}
          </p>
          <p>
            <span>MEDIA TYPE: </span>
            {othermovieinfo?.media_type}
          </p>
          <p>
            <span>STORY: </span> {othermovieinfo?.overview}
          </p>
        </div>
      </div>

      <h4>Trailer...</h4>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
      <h4>CAST....</h4>
      <Creditmember castinfo={castinfo} />
    </div>
  );
};
export default Moviedata;
