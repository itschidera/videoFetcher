// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEo06zAkOX7xioNLyK4Ma7Xv0dfQsVXCo",
  authDomain: "louisianvideo-50384.firebaseapp.com",
  projectId: "louisianvideo-50384",
  storageBucket: "louisianvideo-50384.appspot.com",
  messagingSenderId: "721168604995",
  appId: "1:721168604995:web:cea3913951b3e03111d9f6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//instantiate auth object
const auth = getAuth(app)

//instantiate firestore object
const db = getFirestore(app)

//export the auth object to use in other files
export {auth}

//export the database object to use in other files
export { db }