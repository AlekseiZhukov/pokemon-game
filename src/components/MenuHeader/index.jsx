import React, {useState} from "react";
import {NotificationManager} from 'react-notifications';
import Navbar from "./Navbar";
import Menu from "./Menu";
import Modal from "../Modal";
import LoginForm from "../LoginForm";

const MenuHeader = ({bgActive}) => {
    const [menuIsActive, setMenuIsActive] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleChangeMenuState = () => {
        setMenuIsActive(prevState => !prevState)
    }

    const handleClickLogin = () => {
        setIsOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = async ({email, password, signIn}) => {
        console.log('handleSubmitLoginForm signIn', signIn)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        }
        if (!signIn) {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-XWPQoJvJfiXZqT5z5NDFVDyGh9zO_hg',
                requestOptions )
                .then(res => res.json())
            console.log('handleSubmitLoginForm response NosignIn', response)
            if (response)
                if (response.hasOwnProperty('error')) {
                    NotificationManager.error(response.error.message, 'Wrong!')
                } else {
                    localStorage.setItem('idToken', response.idToken)
                    NotificationManager.success('You registered')
                    handleClickLogin()
                }
        } else {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-XWPQoJvJfiXZqT5z5NDFVDyGh9zO_hg',
                requestOptions )
                .then(res => res.json())
            console.log('handleSubmitLoginForm response signIn', response)
            if (response)
                if (response.hasOwnProperty('error')) {
                    NotificationManager.error(response.error.message, 'Wrong!')
                } else {
                    localStorage.setItem('idToken', response.idToken)
                    NotificationManager.success('You logged in')
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
                <LoginForm onSubmit={handleSubmitLoginForm}/>
            </Modal>
        </div>
    )

}

export default MenuHeader