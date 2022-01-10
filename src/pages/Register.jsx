import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Register.css'

const Register = () => {
  const { registerUser, isLoading, error } = useAuth()

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  const registerSubmitHandler = (e) => {
    e.preventDefault()
    if (passwordInput !== confirmPasswordInput) {
      return
    }
    registerUser(emailInput, passwordInput)

  }

  return (
    <div className='register page flex'>
      <div className='container flex column'>
        <BackButton />
        <h1>Register</h1>
        <form className='flex column' onSubmit={registerSubmitHandler} >
          <input className='mb2' type="email" onChange={(e) => setEmailInput(e.target.value)} value={emailInput} placeholder='Email...' required />
          <input className='mb2' type="password" onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} placeholder='Password...' required />
          <input className='mb2' type="password" onChange={(e) => setConfirmPasswordInput(e.target.value)} value={confirmPasswordInput} placeholder='Confirm Password...' required />
          {error &&
            <p className='mt0 mb2 error'>{error}</p>
          }
          <button className={`btn mb2 ${isLoading && 'loading'}`}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
