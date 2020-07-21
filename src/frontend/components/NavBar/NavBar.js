import React from 'react'
import { Link } from "react-router-dom"
import { AiOutlineHome, AiOutlineHeart, AiOutlineCompass, AiOutlinePlusCircle } from 'react-icons/ai' 
import { FiSend, FiUser } from 'react-icons/fi' 

import './NavBar.css'

const NavBar = () => {
    return (
        <div className="NavBar bottom-box-shadow">
            <Link to="/post"><AiOutlinePlusCircle /></Link>
            <div className="logo">Instapost</div>
            <div className="icons-container">
                <Link to="/"><AiOutlineHome /></Link>
                <AiOutlineCompass />
                <AiOutlineHeart />
                <FiSend />
                <FiUser />
            </div>
        </div>
    )
}

export default NavBar
