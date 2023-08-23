import React from "react";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import { auth, provider } from "../firebase-config.js";
import HomeAnimation from "./HomeAnimation"; // Import your HomeAnimation component

const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="auth-content">
        <div className="auth">
          <HomeAnimation /> {/* Add the HomeAnimation component */}
          <button onClick={signInWithGoogle}>Sign In with Google</button>
          <footer>
            Design and coded by
            <a href="https://daphnebonilla.com/" target="_blank">
              <br /> Daphne Bonilla 👩🏽‍💻
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};
