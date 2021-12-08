import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
const Login = () => {
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
  const history = useNavigate();
  console.log(history);
  const toggledown = (e) => {
    console.log(e.target.className);
    if (e.target.className === "login_box") {
      history("/");
    }
  };
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const handlechangeforlogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setlogin((data) => {
      return { ...login, [name]: value };
    });
  };
  const submitlogin = (e) => {
    e.preventDefault();
    if (login.email && login.password) {
      signInWithEmailAndPassword(auth, login.email, login.password)
        .then(() => {
          console.log("we are logined");
          history("/movie");
        })
        .catch((e) => {
          alert("either email wrong or password wrong");
        });
    } else {
      alert("plz fill the data");
    }
  };

  return (
    <div className="login_box" onClick={(e) => toggledown(e)}>
      <div className="box">
        <h1>Login In</h1>
        <form onSubmit={submitlogin}>
          <div className="box_items">
            <label>Email:</label>
            <br />
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => handlechangeforlogin(e)}
            />
          </div>
          <div className="box_items">
            <label>Password:</label>
            <br />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handlechangeforlogin(e)}
            />
          </div>
          <div className="box_items">
            <button className="submit">submit</button>
          </div>
        </form>
      </div>

      <h3>
        if you have not signin yet, then <Link to={`/signin`}>signin</Link>
      </h3>
    </div>
  );
};

export default Login;
