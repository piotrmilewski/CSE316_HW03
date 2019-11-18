import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

// MY STUFF
var firebaseConfig = {
    apiKey: "AIzaSyBzHLoEUOxC0NBQoP3TI4Rqc6VLX1D49kw",
    authDomain: "pmilewski-todo-316.firebaseapp.com",
    databaseURL: "https://pmilewski-todo-316.firebaseio.com",
    projectId: "pmilewski-todo-316",
    storageBucket: "pmilewski-todo-316.appspot.com",
    messagingSenderId: "791916855251",
    appId: "1:791916855251:web:b135fa14f47a059684b926",
    measurementId: "G-7JFB72S5YJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics(); dunno what this is but it's throwing an error so begone


/* OLD STUFF
var firebaseConfig = {
    apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    authDomain: "todo-rrf-316.firebaseapp.com",
    databaseURL: "https://todo-rrf-316.firebaseio.com",
    projectId: "todo-rrf-316",
    storageBucket: "todo-rrf-316.appspot.com",
    messagingSenderId: "892398996038",
    appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    measurementId: "G-TEGQB3MZ23"
};
firebase.initializeApp(firebaseConfig);
*/

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;