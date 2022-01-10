import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  const registerUser = async (email, password) => {
    setIsLoading(true)
    let res
    try {
      res = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError(e.message)
    }
    setIsLoading(false)
    return res
  }

  const loginUser = async (email, password) => {
    setIsLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      setError(e.message)
    }
    setIsLoading(false)
  }

  const logoutUser = () => {
    return signOut(auth)
  }


  useEffect(() => {
    onAuthStateChanged(auth, (userResponse) => {
      if (userResponse) {
        setUser(userResponse)
      } else {
        setUser(false)
      }
    });
  }, [])

  const values = {
    user,
    isLoading,
    error,
    registerUser,
    loginUser,
    logoutUser
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
