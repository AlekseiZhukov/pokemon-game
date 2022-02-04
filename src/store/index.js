import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter'
import pokemonsReducer from './pokemons'
import selectedPokemonsReducer from './selectedPokemons'

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
        selectedPokemons: selectedPokemonsReducer
    }
})
