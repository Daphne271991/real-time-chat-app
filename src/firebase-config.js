import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7D6luI6kH-UFwwHIWeh_kkX1ptJHrcmI",
  authDomain: "chatapp-993d4.firebaseapp.com",
  projectId: "chatapp-993d4",
  storageBucket: "chatapp-993d4.appspot.com",
  messagingSenderId: "593882052231",
  appId: "1:593882052231:web:ea195c133b636113736a22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
