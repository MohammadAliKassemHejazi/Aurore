import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { getMessaging, getToken } from "firebase/messaging";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    fbtoken: "",
    room: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateE(data.room)) {
      try {
        const url = "https://aurore-web.herokuapp.com/api/users";
        const { data: res } = await axios.post(url, data);
        navigate("/login");
        console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    } else {
      setError("Invalid Form");
    }
  };

  const validateE = (eValue) => {
    var validRegex = /^[Room]+.[0-9]+@[Aurore]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (eValue.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  const subscribe = () => {
    const messaging = getMessaging();
    Notification.requestPermission()
      .then((permission) => {
        console.log(permission);
        if (permission === "granted") {
          getToken(messaging, {
            vapidKey:
              "BL2vZrAv6w3tWQZOAD5MGct91dBYInutTB-zEMTymURIowD_x9tWVKVE3AwcvdLVDAMiwVJoQToKWNMgeBsMIZo",
          })
            .then((currentToken) => {
              if (currentToken) {
                const tokeninput = document.getElementById("showToken");
                tokeninput.value = currentToken;
                data.fbtoken = currentToken;
              } else {
                // Show permission request UI
                console.log(
                  "No registration token available. Request permission to generate one."
                );
                // ...
              }
            })
            .catch((err) => {
              console.log("An error occurred while retrieving token. ", err);
              // ...
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="token"
              name="token"
              id="showToken"
              onChange={handleChange}
              value={data.fbtoken}
              required
              disabled
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Room-Number"
              name="room"
              onChange={handleChange}
              value={data.room}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className="d-flex">
              <button
                onClick={subscribe}
                className={styles.green_btn}
                type="button"
              >
                Get Token to Submit
              </button>
              <button type="submit" className={styles.green_btn}>
                Sing Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
