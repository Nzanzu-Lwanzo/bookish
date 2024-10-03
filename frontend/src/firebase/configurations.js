import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVY9Zhr5tfOSeSRexT3-BdK3hxdlyTxIE",
  authDomain: "developement-80000.firebaseapp.com",
  projectId: "developement-80000",
  storageBucket: "developement-80000.appspot.com",
  messagingSenderId: "172356906444",
  appId: "1:172356906444:web:90d578e6ef8202a4acc169",
  measurementId: "G-E031Z9MGWQ",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
