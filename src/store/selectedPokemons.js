import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'selectedPokemons',
    initialState: {
        data: {},
        player2Pokemons: null,
        isLoading: false,
        selectedPokemon: null

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

        addPlayer2Pokemons: (state, action) => ({
            ...state,
            player2Pokemons: action.payload,
            isLoading: false

        }),
        cleanPlayer2Pokemons: (state) => ({
            ...state,
            player2Pokemons: null,
            isLoading: false
        }),
        setLoading: (state) => ({
            ...state,
            isLoading: true
        })
    }
})

export const {addSelectedPokemon, cleanSelectedPokemon, addPlayer2Pokemons, cleanPlayer2Pokemons, setLoading} = slice.actions
export const selectedPokemons = state => state.selectedPokemons.data
export const player2Pokemons = state => state.selectedPokemons.player2Pokemons
export const loading = state => state.selectedPokemons.isLoading

export const getPokemonsPlayer2Async = () => async (dispatch) => {
    dispatch(setLoading())
    const response = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
    const request = await response.json()
    dispatch(addPlayer2Pokemons(request.data))
}

export default slice.reducer