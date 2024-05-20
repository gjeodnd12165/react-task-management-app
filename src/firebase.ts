// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBj1w8R3HMG5khGaZHrdmn-ssXXSf5C1I",
  authDomain: "react-task-app-924ae.firebaseapp.com",
  projectId: "react-task-app-924ae",
  storageBucket: "react-task-app-924ae.appspot.com",
  messagingSenderId: "499296268375",
  appId: "1:499296268375:web:8064f15f7c71c59b5bf312",
  measurementId: "G-F88SCPWWKJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);