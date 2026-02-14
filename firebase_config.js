// Firebase Configuration
// IMPORTANT: Replaces these values with your actual Firebase project keys
// Get them from: Firebase Console -> Project Settings -> General -> Your Apps -> SDK Setup
const firebaseConfig = {
    apiKey: "AIzaSyCUlZWKLcyvdOA1aaGZIMD4X4-UxlcSNv8",
    authDomain: "up-sangh-union.firebaseapp.com",
    databaseURL: "https://up-sangh-union-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "up-sangh-union",
    storageBucket: "up-sangh-union.firebasestorage.app",
    messagingSenderId: "622818555224",
    appId: "1:622818555224:web:6b0e7bf33fc1c4f989a12d",
    measurementId: "G-WQ42LD9BVB"
};

// Initialize Firebase with Realtime Database
// Ensure Firebase SDKs are loaded in the HTML before this file
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.database();
    console.log("Firebase Realtime Database Initialized");
} else {
    console.error("Firebase SDK not found! Make sure to include the scripts in your HTML head.");
}
