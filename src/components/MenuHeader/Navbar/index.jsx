import React from "react";
import cn from 'classnames'
import s from './style.module.css'


const Navbar = ({menuIsActive, bgActive = false, onChangeMenuState}) => {

    return (

        <nav className={cn(s.root, {
            [s.bgActive]: bgActive,
        })}>
          <div className={s.navWrapper}>
            <p className={s.brand}>
              LOGO
            </p>
            <div className={cn(s.menuButton, {[s.active] : menuIsActive})}
            onClick={() => onChangeMenuState && onChangeMenuState(false)}>
              <span />
            </div>
          </div>
        </nav>

    )
}

export default Navbar