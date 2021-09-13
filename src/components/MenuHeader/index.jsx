import React, {useState} from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";

const MenuHeader = () => {
    const [menuIsActive, setMenuIsActive] = useState(undefined)

    const handleChangeMenuState = () => {
        setMenuIsActive(!menuIsActive)
    }

    return (
        <div>
            <Navbar menuIsActive={menuIsActive} onChangeMenuState={handleChangeMenuState}/>
            <Menu menuIsActive={menuIsActive}/>
        </div>
    )

}

export default MenuHeader