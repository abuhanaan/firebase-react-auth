import React, { useContext, useEffect, useState } from 'react'
import { auth, methods } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function updateEmail(email){
        return methods.updateEmail(currentUser, email)
    }

    function updatePassword(password){
        return methods.updatePassword(currentUser, password)
    }

    function resetPassword(email) {
        return methods.sendPasswordResetEmail(email)
    }

    function login(email, password){
        return methods.signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return methods.signOut(auth)
    }

    function signup(email, password) {
        return methods.createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
      
    </AuthContext.Provider>
  )
}
