import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvLfJDqn0rEqc1GJoqQNy2EqEsAn1UfOo",
  authDomain: "realtime-chatapp-mern.firebaseapp.com",
  databaseURL: "https://realtime-chatapp-mern-default-rtdb.firebaseio.com",
  projectId: "realtime-chatapp-mern",
  storageBucket: "realtime-chatapp-mern.appspot.com",
  messagingSenderId: "544126894921",
  appId: "1:544126894921:web:5fecc6f2fd2ca543c0d098",
  measurementId: "G-PLZG557MDC",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
