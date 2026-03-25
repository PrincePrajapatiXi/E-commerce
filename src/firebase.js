import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Yahan Firebase console se copied config paste karo:
const firebaseConfig = {
  apiKey: "AIzaSyC4fZK8NiIp1cwKSvL_Q0xh8U7l4rqefAo",
  authDomain: "catchy-293b0.firebaseapp.com",
  projectId: "catchy-293b0",
  storageBucket: "catchy-293b0.firebasestorage.app",
  messagingSenderId: "554754032395",
  appId: "1:554754032395:web:85339bf4a1e384eb16180e",
  measurementId: "G-G96JB70VPR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();