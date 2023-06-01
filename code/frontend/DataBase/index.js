import { initializeApp } from "firebase/app";
// import {getAuth, onAuthStateChanged} from 'firebase/auth';
import{getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBpaY7Ds0ypV7P6yJocAARhQqSDqcZnKJs",
    authDomain: "baraglaaim.firebaseapp.com",
    databaseURL: "https://baraglaaim-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "baraglaaim",
    storageBucket: "baraglaaim.appspot.com",
    messagingSenderId: "941901960409",
    appId: "1:941901960409:web:7bf3e5793bbed7753adac8",
    measurementId: "G-8GJP6EDXGZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const todoColl = collection(db, 'todos');
// const snapshot = await getDoc(todoColl);
export const db = getFirestore(app);

// onAuthStateChanged(auth, user =>{
//     if(user != null){
//         console.log("logged in!");
//     }else{
//         console.log("no user");
//     }
// });