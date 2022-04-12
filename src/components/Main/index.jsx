import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const Main = () => {
  const [ListOfRooms, setListOfRooms] = useState([]);
  const [room] = useState("");
  const [firstName] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username === "Admin") {
      Axios.get("https://aurore-web.herokuapp.com/api/read", {
        room: room,
        firstName: firstName,
      })
        .then((response) => {
          setListOfRooms(response.data);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      const mainD = document.getElementById("mainD");
      const divEl = document.createElement("div");
      const p = document.createElement("p");

      divEl.style.backgroundColor = "bisque";
      divEl.style.minHeight = "100vh";

      p.innerHTML = `Hello Wlecome Back ${username} add this web application as scrotsh on  your divice and 
      allow chrome notifications  if you faced any problems please contact your admin `;
      p.style.padding = "5rem";
      p.className = "lead";

      mainD.insertAdjacentElement("afterend", divEl);
      divEl.append(p);
    }
  });
  const deleteR = (id) => {
    Axios.delete(`https://aurore-web.herokuapp.com/api/delete/${id}`).then(
      () => {
        setListOfRooms(
          ListOfRooms.filter((val) => {
            return val._id !== id;
          })
        );
      }
    );
  };

  const sendN = (token, index) => {
    console.log("toke:" + token);

    const title = document.getElementById("title" + index).value;
    const msg = document.getElementById("msg" + index).value;

    let body = {
      to: token,
      notification: {
        title: title,
        body: msg,
      },
      data: {
        icon: "../build/favicon.ico",
      },
    };

    const options = {
      method: "POST",
      headers: new Headers({
        Authorization:
          "key=AAAAcpzoN20:APA91bHc1x72wyarFuQ5vezt55aYbOSWVkRvQUUlEMXSi7F4SsVC5WBWhdgDxU0YlpgnUFxbUhOzZ26oyqFWIRiqJ37-15ydeTTkIkebbjMZrQMo7H2mexG4Rc8Yeb57BbKpKMQt-Q03",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    };

    fetch("https://fcm.googleapis.com/fcm/send", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className={styles.main_container} id="mainD">
      <nav className={styles.navbar}>
        <span className={styles.icon}></span>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="row" style={{ background: "rgb(253, 242, 233)" }}>
        {ListOfRooms.map((val, index) => {
          return (
            <div className="col-md-6 p-5" key={index}>
              <div className="card  mb-3">
                <div
                  className="card-body border border-1 "
                  style={{ background: "rgba(235, 150, 76, 0.467)" }}
                >
                  <h4 className="card-title"> Email: {val.room}</h4>
                  <p className="card-text lead"> Name: {val.firstName}</p>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                      style={{ background: "rgba(235, 150, 76, 0.467)" }}
                    >
                      Title
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      id={"title" + index}
                      style={{ background: "#fdf2e9" }}
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                      style={{ background: "rgba(235, 150, 76, 0.467)" }}
                    >
                      Body
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      id={"msg" + index}
                      style={{ background: "#fdf2e9" }}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-secondary m-2"
                      onClick={() => {
                        sendN(val.fbtoken, index);
                      }}
                    >
                      Send Notification
                    </button>
                    <button
                      className="btn btn-outline-danger m-2"
                      onClick={() => {
                        deleteR(val._id);
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
