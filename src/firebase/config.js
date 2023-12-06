import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import env from "@/env.js";

initializeApp(env.firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
