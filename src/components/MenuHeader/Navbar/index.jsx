import React from "react";
import cn from 'classnames'
import s from './style.module.css'


const Navbar = ({menuIsActive, onChangeMenuState}) => {
    const handleClick = () => {
        onChangeMenuState && onChangeMenuState(false)
    }

    return (

        <nav className={s.root}>
          <div className={s.navWrapper}>
            <p className={s.brand}>
              LOGO
            </p>
            <a className={cn(s.menuButton, {[s.active] : menuIsActive})}
            onClick={handleClick}>
              <span />
            </a>
          </div>
        </nav>

    )
}

export default Navbar