import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.css";
import app from "./firebase";
import { getMessaging, onMessage } from "firebase/messaging";

function App() {
  const firesbase = app;
  const user = localStorage.getItem("token");
  const messaging = getMessaging();

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    const notificationOption = {
      body: payload.notification.body,
      icon: payload.data.icon,
    };
    var notification = new Notification(
      payload.notification.title,
      notificationOption
    );

    notification.onclick = function (ev) {
      ev.preventDefault();
      window.open(payload.notification.click_action, "_blank");
      notification.close();
    };
    // ...
  });

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
