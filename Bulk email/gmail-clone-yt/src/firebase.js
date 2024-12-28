//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJg5oq-RKst27MtMji1r-uuW9MgIcWE5w",
  authDomain: "clone-with-reactjs-c7038.firebaseapp.com",
  projectId: "clone-with-reactjs-c7038",
  storageBucket: "clone-with-reactjs-c7038.appspot.com",
  messagingSenderId: "859929374629",
  appId: "1:859929374629:web:4aafdfe6ba705326f5424c"
};

//   const firebaseApp = firebase.initializeApp(firebaseConfig);
   
   const firebaseApp = firebase.initializeApp(firebaseConfig);
   const db = firebaseApp.firestore();
   const auth = firebase.auth();
   const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,db,provider}