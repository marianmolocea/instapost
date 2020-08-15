import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import { auth } from '../../../../firebase';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password) 
        } catch (err) {
            alert(err.message)
        }
    }

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
