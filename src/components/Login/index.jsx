import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ room: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://aurore-web.herokuapp.com/api/auth";
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.data);
      localStorage.setItem("username", res.body.firstName);

      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="">
      <nav className="fixed-top">
        <span className={styles.icon}></span>
        <Link to="/signup">
          <button type="button" className={styles.btn}>
            Sing Up
          </button>
        </Link>
      </nav>

      <header className="home-section ">
        <div>
          <div className="home-inner container">
            <div className="row pt-5">
              <div className="col-lg-8 d-none d-lg-block text-center ">
                <p className="display-4 fst-italic fw-normal">
                  Accueillir et accompagner vers l’autonomie les personnes en
                  <strong> situation de précarité</strong> ou d’exclusion via
                  l’hébergement, les soins et l’insertion.
                </p>
              </div>
              <div className="col-lg-3 ps-2 ">
                <div className={styles.backdropfilter}>
                  <div className="card bg-transparent text-center card-form">
                    <div className="card-body">
                      <h3 className="display-2">Login</h3>
                      <p className="lead">Wlecome Back</p>

                      <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Room"
                            name="room"
                            onChange={handleChange}
                            value={data.room}
                            required
                          />
                        </div>
                        <div className="input-group mb-3">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                          />
                        </div>
                        {error && (
                          <div className={styles.error_msg}>{error}</div>
                        )}
                        <div className="d-grid gap-2 col-6 mx-auto">
                          <input
                            type="submit"
                            className="btn btn-outline-light"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Login;
