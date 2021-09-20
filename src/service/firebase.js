import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyA-XWPQoJvJfiXZqT5z5NDFVDyGh9zO_hg",
    authDomain: "pokemon-game-2505b.firebaseapp.com",
    databaseURL: "https://pokemon-game-2505b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pokemon-game-2505b",
    storageBucket: "pokemon-game-2505b.appspot.com",
    messagingSenderId: "690003072308",
    appId: "1:690003072308:web:36a4083c726642b0624161"
}

firebase.initializeApp(firebaseConfig)
export const fire = firebase
export const database = fire.database()

export default database

