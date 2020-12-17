import React from 'react'
import Logo from 'assets/images/logo/Pokemon-Logo.png'
import {  Image } from 'antd'
function Header() {
    return (
        <div className="header-container">
            <Image src={Logo} preview={false} className="logo" />
            <h5 className="subtitle">Pokemon data, find the pokemon of your dreams</h5>
        </div>
    )
}

export default Header
