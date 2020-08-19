import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

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
            let usernameExists = await db.collection('users').doc(username).get().then(doc => doc.exists);
            if(username && !usernameExists) {
                let authUser = await auth.createUserWithEmailAndPassword(email, password);
                db.collection('users').doc(username).set({
                    username: username,
                })
                setEmail('')
                setPassword('')
                setUsername('')
                return authUser.user.updateProfile({displayName: username});
                
            } else if (usernameExists) { 
                alert('This username is already taken. Please choose another username!')
            }else {
                alert('You must enter an username')
            }
        } catch(err) {
            alert(err.message)
        }
    }

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(loginEmail, loginPassword) 
            
            setEmail('')
            setPassword('')
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
