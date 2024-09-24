// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVY9Zhr5tfOSeSRexT3-BdK3hxdlyTxIE",
  authDomain: "developement-80000.firebaseapp.com",
  projectId: "developement-80000",
  storageBucket: "developement-80000.appspot.com",
  messagingSenderId: "172356906444",
  appId: "1:172356906444:web:90d578e6ef8202a4acc169",
  measurementId: "G-E031Z9MGWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
