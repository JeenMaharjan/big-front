// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBXD9sES1McjTY33aL_1clwqOwuWPwFmvo",
    authDomain: "shop-835bc.firebaseapp.com",
    projectId: "shop-835bc",
    storageBucket: "shop-835bc.appspot.com",
    messagingSenderId: "560013398535",
    appId: "1:560013398535:web:57ce28ae0b3687637490a2"
};


firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();