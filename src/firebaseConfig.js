// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyD6BAbc-VL_jSSIKG-5e6EYAMlx-AKG2JQ",
  authDomain: "fir-frontend-b110f.firebaseapp.com",
  projectId: "fir-frontend-b110f",
  storageBucket: "fir-frontend-b110f.appspot.com",
  messagingSenderId: "279769589001",
  appId: "1:279769589001:web:80742bd9e78bcfc5d71fd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const storage = getStorage(app);