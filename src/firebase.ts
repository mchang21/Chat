import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRlKz6TjXoc5OvljdTywx6C_GD0wUXO68",
  authDomain: "chat-e6165.firebaseapp.com",
  projectId: "chat-e6165",
  storageBucket: "chat-e6165.appspot.com",
  messagingSenderId: "117711001609",
  appId: "1:117711001609:web:c2262c92edaf691e9b80d8",
  measurementId: "G-3L76GN5969"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();