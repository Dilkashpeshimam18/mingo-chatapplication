import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWOZkxcbWum4rVaXmRTTBqrvi8jRQWZJ8",
  authDomain: "mingo-chatapp.firebaseapp.com",
  projectId: "mingo-chatapp",
  storageBucket: "mingo-chatapp.appspot.com",
  messagingSenderId: "611060999481",
  appId: "1:611060999481:web:272828d2c3825e3ca5b4e8",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
