import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBWWfW_5MR5cXuXnuE16kWYHtlQTLwtxfM",
    authDomain: "newsday-io.firebaseapp.com",
    databaseURL: "https://newsday-io-default-rtdb.firebaseio.com",
    projectId: "newsday-io",
    storageBucket: "newsday-io.appspot.com",
    messagingSenderId: "440454284518",
    appId: "1:440454284518:web:ba834a6298870931c2e727",
    measurementId: "G-NKFPEM4T2M"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)