import React from 'react'
import { Link } from "react-router-dom"
import { AiOutlineHome, AiOutlineHeart, AiOutlineCompass, AiOutlinePlusCircle } from 'react-icons/ai' 
import { FiSend, FiUser } from 'react-icons/fi' 

import './NavBar.css'

const NavBar = () => {

    const iconSize = "20px";

    return (
        <div className="NavBar bottom-box-shadow">
            <Link to="/post"><AiOutlinePlusCircle size={iconSize}/></Link>
            <div className="logo">Instapost</div>
            <div className="icons-container">
                <Link to="/"><AiOutlineHome size={iconSize}/></Link>
                <AiOutlineCompass size={iconSize}/>
                <AiOutlineHeart size={iconSize}/>
                <FiSend size={iconSize}/>
                <FiUser size={iconSize}/>
            </div>
        </div>
    )
}

export default NavBar
