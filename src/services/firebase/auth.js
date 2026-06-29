import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "@/services/firebase/firebaseConfig";

// Register
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Forgot Password  ← ADD THIS
export const forgotPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};