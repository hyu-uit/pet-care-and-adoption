import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDmoCZOwgPkWpewuQ-N-mCSBxE0Hvdd9e4',
  authDomain: 'pet-care-and-adoption.firebaseapp.com',
  projectId: 'pet-care-and-adoption',
  storageBucket: 'pet-care-and-adoption.appspot.com',
  messagingSenderId: '612690217446',
  appId: '1:612690217446:web:4916ab8c2fd6bdefefae27',
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

export { app, firestoreDB };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
