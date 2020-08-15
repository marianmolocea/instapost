import React, {useState, useEffect} from 'react'
import { auth } from '../../../../firebase';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const signUp = async (e) => {
        e.preventDefault();
        try {
            let authUser = await auth.createUserWithEmailAndPassword(email, password)
            return authUser.user.updateProfile({displayName: username})     
        } catch(err) {
            alert(err.message)
        } 
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in
                setUser(authUser);
                sessionStorage.setItem('login', true)

                if (!authUser.displayName) {
                    // if we just created someone
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                // user has logged out
                setUser(null)
                sessionStorage.setItem('login', false)
            }
        })

        return () => {
            // perform some cleanup actions
            unsubscribe();
        }
    }, [user, username]);
    return (
        <div className="auth-form">
            <h3>Are you new here?</h3>
            <TextField 
                className="auth__input" 
                label="Username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}    
            />
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