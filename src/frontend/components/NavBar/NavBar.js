import React from 'react'
import { AiOutlineHome, AiOutlineHeart, AiOutlineCompass } from 'react-icons/ai' 
import { FiSend, FiUser } from 'react-icons/fi' 

import './NavBar.scss'

const NavBar = () => {
    return (
        <div className="NavBar bottom-box-shadow">
            <div className="logo">Instapost</div>
            <div className="icons-container">
                <AiOutlineHome />
                <AiOutlineCompass />
                <AiOutlineHeart />
                <FiSend />
                <FiUser />
            </div>
        </div>
    )
}

export default NavBar
