import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD40ydG5Y286M1BIcgrQlPz4JDPfMCIUaQ",
  authDomain: "mafer-pantry-tracker.firebaseapp.com",
  projectId: "mafer-pantry-tracker",
  storageBucket: "mafer-pantry-tracker.appspot.com",
  messagingSenderId: "209110104388",
  appId: "1:209110104388:web:5073a5e54b32b4e362ff11",
  measurementId: "G-95Z3J38QZ4"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
