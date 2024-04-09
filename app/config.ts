import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGaRc1LFY4VjclVTZsKaxVkUlnGP4tWjA",
  authDomain: "imu-routes.firebaseapp.com",
  projectId: "imu-routes",
  storageBucket: "imu-routes.appspot.com",
  messagingSenderId: "1070479610905",
  appId: "1:1070479610905:web:4f6da12d7e97783cc54688",
  measurementId: "G-VCB5GS73D8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
