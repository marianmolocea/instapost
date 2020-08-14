import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyATMbran6xji9sAOdarB7lpECqeEJ8bv-E",
    authDomain: "instapost-ian.firebaseapp.com",
    databaseURL: "https://instapost-ian.firebaseio.com",
    projectId: "instapost-ian",
    storageBucket: "instapost-ian.appspot.com",
    messagingSenderId: "1097815631975",
    appId: "1:1097815631975:web:6b4ab12db0decbaf19ccc2",
    measurementId: "G-G3YF29E4RV"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};