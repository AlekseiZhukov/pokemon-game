import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: {},
    },

    reducers: {
        fetchUser: (state) => ({
            ...state,
            isLoading: true
        }),
        updateUser: (state, action) => ({
            data: action.payload,
            isLoading: false
        }),
        removeUserData: () => ({
            isLoading: false,
            data: {}
        })
    }
})

export const {fetchUser, updateUser, removeUserData} = slice.actions
export const selectDataUserIsLoading = state => state.user.isLoading
export const selectDataUser = state => state.user.data
export const selectLocalIdDataUser = state => state.user.data?.localId

export const getUserUpdateAsync =  () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken')
    if (idToken){

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        }

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD56kcB2knxgF80I7b7RhpRIVLRfTOFF3o',
            requestOptions )
            .then(res => res.json())

        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken')
            dispatch(removeUserData())
        } else {
            dispatch(updateUser(response.users[0]))
        }

    } else {
        dispatch(removeUserData())
    }
}

export const getUserAsync = () => dispatch => {
    dispatch(fetchUser())
    dispatch(getUserUpdateAsync())
}

export default slice.reducer