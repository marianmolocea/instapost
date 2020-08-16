import React, { useContext} from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import { contextProvider } from '../../../context'

const Login = () => {

    const {email, password, setPassword, setEmail, signIn} = useContext(contextProvider);

    return (
        <div className="auth-form">
            <h3>Do you have an account?</h3>
            <TextField 
                className="auth__input" 
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
                className="auth__input" 
                label="Password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outlined" color="primary" onClick={signIn}>login</Button>
        </div>
    )
}

export default Login
