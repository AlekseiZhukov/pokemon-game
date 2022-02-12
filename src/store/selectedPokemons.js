import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'selectedPokemons',
    initialState: {
        data: {},
        player2Pokemons: [],
        isLoading: false,
        typeFinishedGame: null

    },
    reducers: {
        addSelectedPokemon: (state, action) => {
            if (state.data[action.payload.key]) {
                const copyState = {...state.data}
                delete copyState[action.payload.key]
                return {
                    ...state,
                    data: copyState,
                    isLoading: false
                }
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.key]: action.payload.pokemon
                },
                isLoading: false
            }
        },

        cleanSelectedPokemon: (state) => ({
            ...state,
            data: {},
            isLoading: false
        }),

        addPlayer2Pokemons: (state, action) => {

            return  {
            ...state,
            player2Pokemons: action.payload,
            isLoading: false

        }},

        setLoading: (state) => ({
            ...state,
            isLoading: true
        }),
        setTypeFinishedGame: (state, action) => ({
            ...state,
            typeFinishedGame: action.payload
        })
    }
})

export const {addSelectedPokemon, cleanSelectedPokemon, addPlayer2Pokemons, setLoading, setTypeFinishedGame} = slice.actions
export const selectedPokemonsPlayer1 = state => state.selectedPokemons.data
export const player2Pokemons = state => state.selectedPokemons.player2Pokemons
export const loading = state => state.selectedPokemons.isLoading
export const typeFinishedGame = state => state.selectedPokemons.typeFinishedGame



export default slice.reducer