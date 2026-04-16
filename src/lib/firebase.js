import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3Cql4uO14cA4YuQ-01Ha3N67ILYXI2Yg",
  authDomain: "haridas-916f3.firebaseapp.com",
  projectId: "haridas-916f3",
  storageBucket: "haridas-916f3.firebasestorage.app",
  messagingSenderId: "717284874543",
  appId: "1:717284874543:web:e4e6e00e571c1335bb29da",
  measurementId: "G-R2E4SVPRM3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);