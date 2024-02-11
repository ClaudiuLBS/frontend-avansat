import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3nwwFtqpp4CtP6vpaW3hbvc4igEi3GOE",
  authDomain: "react-app-b5a3d.firebaseapp.com",
  projectId: "react-app-b5a3d",
  storageBucket: "react-app-b5a3d.appspot.com",
  messagingSenderId: "845812187148",
  appId: "1:845812187148:web:e2cbf61bbba68717466e29"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export default db
