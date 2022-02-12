import {createSlice} from "@reduxjs/toolkit";
import {selectLocalIdDataUser} from "./user";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,

        }),
        fetchPokemonsError: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload

        }),
        cleanPokemonsData: () => ({
            data: {},
            isLoading: false,
            error: null
        })
    }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsError, cleanPokemonsData} = slice.actions

export const selectPokemonsIsLoading = state => state.pokemons.isLoading
export const selectPokemonsData = state => state.pokemons.data

export const getPokemonsAsync = () => async (dispatch, getState) => {

    const localId = selectLocalIdDataUser(getState())
    dispatch(fetchPokemons())
    const  data = await fetch(`https://pokemon-game-e19b3-default-rtdb.firebaseio.com/${localId}/pokemons.json`)
        .then(res => res.json());

    dispatch(fetchPokemonsResolve(data))
}

export default slice.reducer