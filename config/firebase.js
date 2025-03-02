const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsBdeguzPtnWxnnHpAp8p0k75RrgoPaUM",
    authDomain: "booking-app-e197c.firebaseapp.com",
    databaseURL: "https://booking-app-e197c-default-rtdb.firebaseio.com",
    projectId: "booking-app-e197c",
    storageBucket: "booking-app-e197c.appspot.com",
    messagingSenderId: "502599979186",
    appId: "1:502599979186:web:3e0726b613fc68d66a39ab",
    measurementId: "G-4EHVX7K143"
};

// Initialize Firebase only once
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

module.exports = { database };