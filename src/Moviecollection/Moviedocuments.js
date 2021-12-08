import React, { useState, useEffect } from "react";
import Movieinfo from "./Movieinfo";
import Pagination from "@material-ui/lab/Pagination";
import { useLocation } from "react-router-dom";
import Genere from "../movie_feature_from_single_page/Genere";
import { MdMovie } from "react-icons/md";
import { BiSlideshow } from "react-icons/bi";

function Moviedocuments({
  moviedata,
  setmoviedata,
  update,
  setupdate,
  noofpage = 10,
}) {
  const location = useLocation();
  const pathid = location.pathname.split("/")[2];
  const [toggleMT, settoggleMT] = useState(false);
  //console.log(pathid);
  const [realtimemovie, setrealtimemovie] = useState([]);
  const fetchingdataa = async () => {
    const respond_from_api = await fetch(
      ` https://api.themoviedb.org/3/discover/${
        toggleMT ? "movie" : "tv"
      }?api_key=af3abab3867f0ddb9831952933244908&language=en-US&sort_by=popularity.desc&page=${update}&with_genres=${pathid}`
    );

    const Mdatas = await respond_from_api.json();
    const data = Mdatas.results;
    console.log(data);
    setrealtimemovie(data);
  };
  useEffect(() => {
    if (pathid) {
      //     const newdata = moviedata.filter(data=>data.genre_ids[0]== pathid);
      //   // console.log(newdata);
      //    setrealtimemovie(newdata);
      fetchingdataa();
    }
  }, [pathid, toggleMT, update]);

  const handlingpagination = (page) => {
    console.log(page);
    setupdate(() => {
      return page;
    });
    window.scroll(0, 0);
  };

  return (
    <div className="big">
      <div className="nav">
        <Genere />
        {pathid && (
          <button className="btn" onClick={() => settoggleMT(!toggleMT)}>
            {toggleMT ? <MdMovie /> : <BiSlideshow />}
          </button>
        )}
      </div>
      <div className="big_box">
        {realtimemovie &&
          realtimemovie.map((data) => {
            console.log(data);

            return (
              <Movieinfo
                toggleMT={toggleMT}
                key={data.id}
                media={data.media_type}
                othername={data.name}
                title={data.original_title}
                name={data.original_name}
                imgpath={data.poster_path}
                vote={data.vote_average}
                imgsecond={data.backdrop_path}
                detail={data.overview}
                lan={data.original_language}
                id={data.id}
              />
            );
          })}
        {!realtimemovie.length &&
          moviedata.map((data) => {
            // console.log(data);
            return (
              <Movieinfo
                key={data.id}
                media={data.media_type}
                othername={data.name}
                title={data.original_title}
                name={data.original_name}
                imgpath={data.poster_path}
                vote={data.vote_average}
                imgsecond={data.backdrop_path}
                detail={data.overview}
                lan={data.original_language}
                id={data.id}
              />
            );
          })}
      </div>
      <div className="pagination">
        <Pagination
          count={noofpage}
          onChange={(e) => handlingpagination(e.target.textContent)}
          shape="rounded"
          color="secondary"
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}

export default Moviedocuments;
