// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";


// // Config Data
// const firebaseConfig = {
//   apiKey: "AIzaSyDXhGcjr2a_y3kMy7uRdXbDIGEuYLffVH0",
//   authDomain: "tech-club-website-45e48.firebaseapp.com",
//   projectId: "tech-club-website-45e48",
//   storageBucket: "tech-club-website-45e48.appspot.com",
//   messagingSenderId: "575934096633",
//   appId: "1:575934096633:web:3f8ea3d0c0ded4adddee28",
//   measurementId: "G-L63PZF8D6N"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoIMXYq-KiXDt2uQMckVClkgJSocM-QzY",
  authDomain: "csi-database.firebaseapp.com",
  databaseURL: "https://csi-database-default-rtdb.firebaseio.com",
  projectId: "csi-database",
  storageBucket: "csi-database.appspot.com",
  messagingSenderId: "731254876827",
  appId: "1:731254876827:web:8e3c27f48e538d1970343e",
  measurementId: "G-2FPF929728"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Authentication
const provider = new GoogleAuthProvider();

export const auth = getAuth(app)

export const googleSignIn = () => {
  signInWithRedirect(auth, provider);
}