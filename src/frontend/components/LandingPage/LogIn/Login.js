import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="auth-form">
            <h3>Do you have an account?</h3>
            <TextField 
                className="auth__input" 
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField 
                className="auth__input" 
                label="Password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outlined" color="primary">login</Button>
        </div>
    )
}

export default Login
