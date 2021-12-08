import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
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

  const toggledown = (e) => {
    console.log(e.target.className);
    if (e.target.className === "signin_box") {
      history("/");
    }
  };
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
    Cpassword: "",
  });
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser((data) => {
      return { ...user, [name]: value };
    });
  };
  const submithandler = async (e) => {
    e.preventDefault();
    if (user.password && user.email && user.username && user.Cpassword) {
      if (user.password === user.Cpassword) {
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then(() => {
            history("/login");
            toast.warn("register sucessful", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 5000,
              draggable: true,
            });
          })
          .catch((err) => {
            toast.warn(
              "There is something error, may be you are already signup from this account.Plz try again",
              {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 5000,
                draggable: true,
              }
            );
            setuser((data) => {
              return {
                ...data,
                username: "",
                email: "",
                password: "",
                Cpassword: "",
              };
            });
          });
      } else {
        toast.warn("your confirmed password doesnot match previous password", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
          draggable: true,
        });
      }
    } else {
      toast.warn("plz fill all the data", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="signin_box" onClick={(e) => toggledown(e)}>
      <div className="box">
        <h1>Sign In</h1>
        <ToastContainer theme="dark" />
        <form onSubmit={submithandler}>
          <div className="box_items">
            <label>Username:</label>
            <br />
            <input
              value={user.username}
              type="text"
              placeholder="name"
              name="username"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <div className="box_items">
            <label>Email:</label>
            <br />
            <input
              value={user.email}
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <div className="box_items">
            <label>Password:</label>
            <br />
            <input
              value={user.password}
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handlechange(e)}
            />
          </div>{" "}
          <div className="box_items">
            <label>confirm password:</label>
            <br />
            <input
              value={user.Cpassword}
              type="password"
              placeholder="password"
              name="Cpassword"
              onChange={(e) => handlechange(e)}
            />
          </div>
          <div className="box_items">
            <button className="submit">submit</button>
          </div>
        </form>
      </div>
      <h3>
        if you already have signin, then <Link to={`/login`}>Login</Link>
      </h3>
    </div>
  );
};

export default Signin;
