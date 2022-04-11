importScripts("https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js"
);

var firebaseConfig = {
  // Config Code
  apiKey: "AIzaSyAwUXyCVOJ2Byz3degKvx23FD85bX_Xahg",
  authDomain: "web-app-84630.firebaseapp.com",
  projectId: "web-app-84630",
  storageBucket: "web-app-84630.appspot.com",
  messagingSenderId: "492258735981",
  appId: "1:492258735981:web:5e20d92b3cfc69b8f54c64",
  measurementId: "G-1REMWMT2ZW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notification = payload;
  const notificationOption = {
    body: notification.body,
    icon: notification.icon,
  };
  self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});
