import React, {useState} from "react";
import {NotificationManager} from 'react-notifications';
import Navbar from "./Navbar";
import Menu from "./Menu";
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import {useDispatch} from "react-redux";
import {getUserUpdateAsync} from "../../store/user";

const loginSignUpUser = async ({email, password, type}) => {

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    }
    switch (type) {
        case 'login':
            return await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD56kcB2knxgF80I7b7RhpRIVLRfTOFF3o',
            requestOptions )
            .then(res => res.json())
        case 'signUp':
            return await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD56kcB2knxgF80I7b7RhpRIVLRfTOFF3o',
                requestOptions )
                .then(res => res.json())
        default:
            return 'I cannot login user'

    }
}

const MenuHeader = ({bgActive}) => {
    const [menuIsActive, setMenuIsActive] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const dispatch = useDispatch()

    const handleChangeMenuState = () => {
        setMenuIsActive(prevState => !prevState)
    }

    const handleClickLogin = () => {
        setIsOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = async (props) => {

        const response = await loginSignUpUser(props)

        if (response) {

            if (response.hasOwnProperty('error')) {
                NotificationManager.error(response.error.message, 'Wrong!')
            } else {
                localStorage.setItem('idToken', response.idToken)
                if (props.type === 'signUp') {
                    const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter')
                        .then(res => res.json())

                    for (const item of pokemonsStart.data) {
                        await fetch(`https://pokemon-game-e19b3-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`,
                            {
                                method: 'POST',
                                body: JSON.stringify(item)
                            })
                    }

                    NotificationManager.success('You registered')
                }
                if (props.type === 'login') {
                    dispatch(getUserUpdateAsync())
                    NotificationManager.success('You logged in')
                }
                handleClickLogin()
            }
        }
    }

    return (
        <div>
            <Menu menuIsActive={menuIsActive} onChangeMenuState={handleChangeMenuState}/>
            <Navbar
                menuIsActive={menuIsActive}
                bgActive={bgActive}
                onChangeMenuState={handleChangeMenuState}
                onClickLogin={handleClickLogin}
            />
            <Modal
                title='Login and Register'
                onCloseModal={handleClickLogin}
                isOpen={isOpenModal}
            >
                <LoginForm
                    isResetField={!isOpenModal}
                    onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </div>
    )

}

export default MenuHeader