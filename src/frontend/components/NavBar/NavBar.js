import React from 'react'
import { Link } from "react-router-dom"
import { AiOutlineHome, AiOutlineHeart, AiOutlineCompass, AiOutlinePlusCircle } from 'react-icons/ai' 
import { FiSend, FiUser } from 'react-icons/fi' 

import './NavBar.scss'

const NavBar = () => {
    return (
        <div className="NavBar bottom-box-shadow">
            <div className="logo">Instapost</div>
            <Link to="/post"><AiOutlinePlusCircle /></Link>
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
