import React, { useState, useRef } from "react";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  const enterChat = () => {
    const enteredRoom = roomInputRef.current.value.toLowerCase();
    setRoom(enteredRoom);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <>
          <Chat room={room} />

          {/* Display the "Sign Out" button only inside the chat room */}
          <div className="sign-out">
            <button onClick={signUserOut} className="sign-out-button">
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div className="room">
          <label>Enter Room Name: </label>
          <input ref={roomInputRef} placeholder="Enter Team Name" />{" "}
          <button className="room-button" onClick={enterChat}>
            Enter Chat
          </button>
          <footer>
            Design and coded by
            <a
              href="https://daphnebonilla.com/"
              target="_blank"
              rel="noreferrer"
            >
              <br /> Daphne Bonilla 👩🏽‍💻
            </a>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
