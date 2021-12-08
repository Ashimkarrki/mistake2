import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Banner from "./Banner.js";
const Home = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDTbxgaDiW9krkrJha-Zz1pGWkHqr7ClQ8",
    authDomain: "fir-learning-bff74.firebaseapp.com",
    projectId: "fir-learning-bff74",
    storageBucket: "fir-learning-bff74.appspot.com",
    messagingSenderId: "326653008218",
    appId: "1:326653008218:web:cceaa350224c13b7417b63",
  };
  // Initialize Firebase
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const logoutfun = (e) => {
    signOut(auth)
      .then(() => {
        console.log("we loged out");
      })
      .catch((err) => {});
  };

  return (
    <>
      <div className="homepage">
        <div className="displaynone">
          <Link to={`/signin`}>signin</Link>
          <Link to={`/login`}>loginin</Link>
          <button onClick={logoutfun}>log out</button>
        </div>

        <Banner />
        <h1>hello world</h1>
      </div>
    </>
  );
};

export default Home;
