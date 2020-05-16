import * as firebase from 'firebase';
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "razer-hackathon.firebaseapp.com",
    databaseURL: "https://razer-hackathon.firebaseio.com",
    projectId: "razer-hackathon",
    storageBucket: "razer-hackathon.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
export const loanRef = databaseRef.child("loan")
export const formRef = databaseRef.child("form")
export const industryRef = databaseRef.child("industry")