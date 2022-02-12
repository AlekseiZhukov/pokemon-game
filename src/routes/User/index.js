import React from "react";
import s from './style.module.css'
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeUserData, selectDataUser} from "../../store/user";
import {fetchPokemonsResolve} from "../../store/pokemons";


const User = () => {
    const history = useHistory()
    const userData = useSelector(selectDataUser)
    const dispatch = useDispatch()

    const handleLogoutUser = () => {
        dispatch(removeUserData())
        localStorage.removeItem('idToken')
        dispatch(fetchPokemonsResolve({}))
        history.replace('/')

    }

    return (
        <>

            <div className={s.root}>
                <h1>
                    login name: {userData.email}
                </h1>

                <div>
                    <button onClick={ () => history.push('/')}>return Home Page</button>
                    <button onClick={handleLogoutUser}>Logout</button>
                </div>

            </div>
        </>
    )
}

export default User