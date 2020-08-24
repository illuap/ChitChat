import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBh6_9ZRgLe1NE_I0lRISwj3wohI-q00xI",
  authDomain: "chitchat-edf2c.firebaseapp.com",
  databaseURL: "https://chitchat-edf2c.firebaseio.com",
  projectId: "chitchat-edf2c",
  storageBucket: "chitchat-edf2c.appspot.com",
  messagingSenderId: "22380635721",
  appId: "1:22380635721:web:22c61e500058ec8ad2c198",
  measurementId: "G-81WMS26W80"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.firestore();
export const firestore = firebase.firestore();