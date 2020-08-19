import React, {useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import { contextProvider } from '../../../context'

const SignUp = () => {

    const {username, setUsername, email, setEmail, password, setPassword, signUp, user, auth} = useContext(contextProvider);

    return (
        <div className="auth-form">
            <h3>Are you new here?</h3>
            <TextField 
                className="auth__input" 
                label="Username" 
                type="text"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}    
            />
            <TextField 
                className="auth__input" 
                label="Email"
                type="text"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}  
            />
            <TextField 
                className="auth__input" 
                label="Password" 
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            {
                user ? 
                    <Button variant="outlined" color="primary" onClick={() => auth.signOut()}>Logout</Button>
                    : 
                    <Button variant="outlined" color="primary" onClick={signUp}>Sign Up</Button>

            }
        </div>
    )
}

export default SignUp
