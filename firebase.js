import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, collection, addDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyBCiVO9P4aI8EuEuLmKXFicv18gPeT-KQM",
    authDomain: "restaurant-web-1fb2b.firebaseapp.com",
    projectId: "restaurant-web-1fb2b",
    storageBucket: "restaurant-web-1fb2b.appspot.com",
    messagingSenderId: "37452105521",
    appId: "1:37452105521:web:71f002a9a86b7fb4d05210",
    measurementId: "G-C7CKM8T0DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db,
    doc,
    addDoc,
    collection,
}