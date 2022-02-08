import { configureStore } from "@reduxjs/toolkit";

import pokemonsReducer from './pokemons'
import selectedPokemonsReducer from './selectedPokemons'
import userReducer from './user'

export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReducer,
        selectedPokemons: selectedPokemonsReducer
    }
})
