import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCPs7KOpmhVSLiroAqztRrNcQMCs5jDD6I',
  authDomain: 'react-native-e5dcd.firebaseapp.com',
  projectId: 'react-native-e5dcd',
  storageBucket: 'react-native-e5dcd.appspot.com',
  messagingSenderId: '976058217062',
  appId: '1:976058217062:web:2189d8b179f4d0fbb5f3a7',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const database = getDatabase(app);
export const dbService = getFirestore(app);
