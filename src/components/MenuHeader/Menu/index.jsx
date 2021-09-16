import React from "react";
import {Link} from 'react-router-dom'
import cn from 'classnames'
import s from './style.module.css'

const MENU = [
    {
        title: 'HOME',
        to: '/'
    },
    {
        title: 'GAME',
        to: 'game'
    },
    {
        title: 'CONTACT',
        to: 'contact'
    },
    {
        title: 'ABOUT',
        to: 'about'
    },
]


const Menu = ({menuIsActive, onChangeMenuState}) => {

    return (

        <div className={cn(s.menuContainer, {
            [s.active] : menuIsActive === true,
            [s.deactive] : menuIsActive === false
        })} >
          <div className={s.overlay} />
          <div>
            <ul>
                {
                    MENU.map(({title, to}, index) => (
                        <li key={index}>
                            <Link to={to} onClick={() => onChangeMenuState(false)}>
                                {title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
          </div>
        </div>

    )
}

export default Menu