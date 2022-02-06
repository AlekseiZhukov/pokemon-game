import React from "react";
import cn from 'classnames'
import s from './style.module.css'
import {ReactComponent as LoginSvg} from '../../../assets/images/login.svg'
import logo from '../../../assets/images/logo.svg'


const Navbar = ({menuIsActive, bgActive = false, onChangeMenuState, onClickLogin}) => {

    return (

        <nav className={cn(s.root, {
            [s.bgActive]: bgActive,
        })}>
          <div className={s.navWrapper}>
                <img src={logo}  alt={'logo'}/>

            <div className={s.loginAndMenu} >
                <div
                    className={s.loginWrap}
                    onClick={onClickLogin}
                >
                    <LoginSvg />
                </div>
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