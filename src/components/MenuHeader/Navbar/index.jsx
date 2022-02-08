import React from "react";
import cn from 'classnames'
import s from './style.module.css'
import {ReactComponent as LoginSvg} from '../../../assets/images/login.svg'
import logo from '../../../assets/images/logo.svg'
import {ReactComponent as UserLogo} from '../../../assets/images/user.svg'
import {useSelector} from "react-redux";
import {selectDataUserIsLoading, selectLocalIdDataUser} from "../../../store/user";
import {Link} from "react-router-dom";


const Navbar = ({menuIsActive, bgActive = false, onChangeMenuState, onClickLogin}) => {
    const userLocalId = useSelector(selectLocalIdDataUser)
    const isLoadingUser = useSelector(selectDataUserIsLoading)

    return (

        <nav className={cn(s.root, {
            [s.bgActive]: bgActive,
        })}>
          <div className={s.navWrapper}>
                <img src={logo}  alt={'logo'}/>

            <div className={s.loginAndMenu} >
                { (!isLoadingUser && !userLocalId) && (
                    <div
                        className={s.loginWrap}
                        onClick={onClickLogin}
                    >
                        <LoginSvg/>
                    </div>)}
                {(!isLoadingUser && userLocalId) && (
                    <Link
                        className={s.loginWrap}
                        to={'/user'}
                    >
                        <UserLogo/>
                    </Link>)}
                <div className={cn(s.menuButton, {[s.active] : menuIsActive})}
                     onClick={() => onChangeMenuState && onChangeMenuState(false)}>
                    <span />
                </div>
            </div>
          </div>
        </nav>

    )
}

export default Navbar