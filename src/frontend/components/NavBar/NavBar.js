import React, {useContext} from 'react'
import { contextProvider } from '../../context'
import { Link } from "react-router-dom"
import { AiOutlineHome, AiOutlineHeart, AiOutlineCompass, AiOutlinePlusCircle } from 'react-icons/ai' 
import { FiSend, FiUser } from 'react-icons/fi' 

import './NavBar.css'
import { Button } from '@material-ui/core'

const NavBar = () => {

    const {user} = useContext(contextProvider)

    const iconSize = "22px";

    return (
        <div className="NavBar bottom-box-shadow">
            <Link to="/post">
                <Button variant="outlined">
                    <AiOutlinePlusCircle size={iconSize}/>&nbsp; Add Post
                </Button>
            </Link>
            <div className="logo">
                InstaPost
            </div>
            <div className="icons-container">
                <Link to="/"><AiOutlineHome size={iconSize}/></Link>
                <AiOutlineCompass size={iconSize}/>
                <AiOutlineHeart size={iconSize}/>
                <Link to={`/profile/${user.displayName}/chat`}><FiSend size={iconSize}/></Link>
                <Link to="/profile"><FiUser size={iconSize}/></Link>
            </div>
        </div>
    )
}

export default NavBar
