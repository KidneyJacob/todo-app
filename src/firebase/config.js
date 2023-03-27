import firebase from "firebase/app";
import "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyBWN23yVwv1GqWQNLE4FAwZUyORestUFmo",
    authDomain: "todo-app-7cda7.firebaseapp.com",
    projectId: "todo-app-7cda7",
    storageBucket: "todo-app-7cda7.appspot.com",
    messagingSenderId: "366809726766",
    appId: "1:366809726766:web:5a15250aec9ca7fb1904bf"
  };

//   počáteční nastavení firebase (init)
firebase.initializeApp(firebaseConfig)

// počáteční nastavení služeb
const projectFirestore = firebase.firestore()

export { projectFirestore }