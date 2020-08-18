import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const contextProvider = createContext();

const Context = ({children}) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [session, setSession] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [profilePicture, setProfilePicture] = useState('')

    const signUp = async (e) => {
        e.preventDefault();
        try {
            let authUser = await auth.createUserWithEmailAndPassword(email, password)
            return authUser.user.updateProfile({displayName: username})     
        } catch(err) {
            alert(err.message)
        } 
    }

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(loginEmail, loginPassword) 
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in
                setUser(authUser);
                setSession(true)
                setIsLoading(false);
                setProfilePicture(authUser.photoURL)
                
                if (!authUser.displayName) {
                    // if we just created someone
                    return authUser.updateProfile({
                        displayName: username
                    })
                }
            } else {
                // user has logged out
                setUser(null)
                setSession(false)
                setIsLoading(false);
            }
        })

        return () => {
            // perform some cleanup actions
            unsubscribe();
        }
    }, [user, username, session, isLoading]);

    return (
        <contextProvider.Provider 
            value={
                {
                    email, 
                    username, 
                    password,
                    loginEmail,
                    loginPassword,
                    user,
                    auth,
                    session,
                    profilePicture,
                    setProfilePicture,
                    setSession,
                    setEmail,
                    setPassword,
                    setUsername,
                    setLoginPassword,
                    setLoginEmail,
                    signUp,
                    signIn,
                    isLoading
                }
            }>
            {children}
        </contextProvider.Provider>
    )
}

export default Context
