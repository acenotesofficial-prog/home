import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR_6gs3fuPKa56XUUk06TXUH_w8CatHCA",
  authDomain: "acenotes-org.firebaseapp.com",
  projectId: "acenotes-org",
  storageBucket: "acenotes-org.firebasestorage.app",
  messagingSenderId: "768212403156",
  appId: "1:768212403156:web:a5515d95a63a1e24100c41",
  measurementId: "G-EE3T9VVNNG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
