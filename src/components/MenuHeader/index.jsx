import React, {useState} from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";

const MenuHeader = ({bgActive}) => {
    const [menuIsActive, setMenuIsActive] = useState(null)

    const handleChangeMenuState = () => {
        setMenuIsActive(prevState => !prevState)
    }

    return (
        <div>
            <Navbar menuIsActive={menuIsActive} bgActive={bgActive} onChangeMenuState={handleChangeMenuState}/>
            <Menu menuIsActive={menuIsActive} onChangeMenuState={handleChangeMenuState}/>
        </div>
    )

}

export default MenuHeader