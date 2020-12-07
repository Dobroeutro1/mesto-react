import React from 'react';
import logo from "../images/logo.png";

function Header() {
    return(
        <header className="header">
            <img src={logo} alt="Логотип Mesto Russia" className="logo" />
        </header>
    )
}

export default Header