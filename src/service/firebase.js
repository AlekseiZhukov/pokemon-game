import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyD56kcB2knxgF80I7b7RhpRIVLRfTOFF3o",
    authDomain: "pokemon-game-e19b3.firebaseapp.com",
    databaseURL: "https://pokemon-game-e19b3-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-e19b3",
    storageBucket: "pokemon-game-e19b3.appspot.com",
    messagingSenderId: "454619811621",
    appId: "1:454619811621:web:2540d37ee71de34e4754cc"
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

const FirebaseClass = new Firebase()

export default FirebaseClass

