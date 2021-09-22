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

class Firebase {
    constructor() {

        this.fire = firebase;
        this.database = this.fire.database();
    }

    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val())
        })
    }

    offPokemonSoket = () => {
        this.database.ref('pokemons').off()

    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = (data) => {
        const newKey = this.database.ref().child('pokemons').push().key;
        this.database.ref('pokemons/' + newKey).set(data);
    }
}


export default Firebase

