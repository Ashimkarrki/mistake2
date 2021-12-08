import React, { useState, useEffect } from "react";
import Moviedocuments from "./Moviecollection/Moviedocuments";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./css/index.css";
import Moviedata from "./Movie_data_about_one/Moviedata";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Login from "./components/Login";

const Key = "api_key=af3abab3867f0ddb9831952933244908";
const mainurl = "https://api.themoviedb.org/3";
const url = mainurl + "/discover/movie?sort_by=popularity.desc&" + Key;

function App() {
  const [update, setupdate] = useState(1);
  const [loading, setloading] = useState(true);
  const [moviedata, setmoviedata] = useState([]);
  const fetchingdataa = async () => {
    try {
      const respond_from_api = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=af3abab3867f0ddb9831952933244908&page=${update}`
      );
      const Mdatas = await respond_from_api.json();
      const data = Mdatas.results;
      setloading(false);
      setmoviedata(data);
      return 1;
    } catch (error) {
      setloading(false);
      return <main>sorry! we got some error</main>;
    }
  };

  useEffect(() => {
    fetchingdataa();
  }, [update]);

  const hello = () => {
    console.log("hello world");
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movie"
            element={
              <Moviedocuments
                moviedata={moviedata}
                update={update}
                setupdate={setupdate}
              />
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/:Id/:Media/:Originalname"
            element={
              <Moviedata fetchingdataa={fetchingdataa} moviedata={moviedata} />
            }
          />
          <Route
            path=":Genere/:Id"
            element={
              <Moviedocuments
                setmoviedata={setmoviedata}
                moviedata={moviedata}
                update={update}
                setupdate={setupdate}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
