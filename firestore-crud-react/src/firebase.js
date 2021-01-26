import firebase from 'firebase/app'
import 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyBm860uD4aqISrXAXC2FXqeoFhrq-Jhrcs",
    authDomain: "fb-crud-react-3fb26.firebaseapp.com",
    projectId: "fb-crud-react-3fb26",
    storageBucket: "fb-crud-react-3fb26.appspot.com",
    messagingSenderId: "530299421930",
    appId: "1:530299421930:web:0e089bbb0546e360458393"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
   export const db = fb.firestore();