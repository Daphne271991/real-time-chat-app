import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { auth, db, provider } from "../firebase-config"; // Import the provider directly
import "../styles/Chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");

  const loadMessages = async () => {
    try {
      const queryMessages = query(
        messagesRef,
        where("room", "==", room),
        orderBy("createdAt")
      );
      const snapshot = await getDocs(queryMessages);
      const messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(messages);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  useEffect(() => {
    loadMessages();

    // Set up real-time listener for new messages
    const unsubscribe = onSnapshot(
      query(messagesRef, where("room", "==", room), orderBy("createdAt")),
      (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(updatedMessages);
      }
    );

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, [room]);

  const authenticateWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      // Now the user is authenticated, you can load messages or perform other actions.
      loadMessages();
    } catch (error) {
      console.error("Error authenticating with Google:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      authenticateWithGoogle();
      return;
    }

    if (newMessage === "") return;

    try {
      await addMessage();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const addMessage = async () => {
    if (newMessage === "") return;

    try {
      const newMessageDocRef = await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room: room,
      });

      // Update the local messages state with the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newMessageDocRef.id,
          text: newMessage,
          user: auth.currentUser.displayName,
        },
      ]);

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()} </h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
