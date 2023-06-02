// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUnkcxrEz32ELqwdnF0Ofszk3oHz6EwpE",
  authDomain: "kuesioner-sidos-mhs.firebaseapp.com",
  projectId: "kuesioner-sidos-mhs",
  storageBucket: "kuesioner-sidos-mhs.appspot.com",
  messagingSenderId: "776836684558",
  appId: "1:776836684558:web:293d7df8d253a27855555f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const dbFs = getFirestore(app);

export default dbFs;
