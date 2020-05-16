import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDToPGriOjvguAGOwf2Yxtkkeh5oR1UlMI",
    authDomain: "razer-hackathon.firebaseapp.com",
    databaseURL: "https://razer-hackathon.firebaseio.com",
    projectId: "razer-hackathon",
    storageBucket: "razer-hackathon.appspot.com",
    messagingSenderId: "890279692437",
    appId: "1:890279692437:web:79626a48ee61ec3803739c",
    measurementId: "G-NHG5X99LLS"
};
firebase.initializeApp(config);

const databaseRef = firebase.database().ref();
// loan requests
export const loanRef = databaseRef.child("loan")
export const formRef = databaseRef.child("form")
export const industryRef = databaseRef.child("industry")