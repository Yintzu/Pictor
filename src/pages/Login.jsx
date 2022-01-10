import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Login.css'

const Login = () => {
  const { loginUser, isLoading, error, user } = useAuth()
  const navigate = useNavigate()

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const submitLoginHandler = (e) => {
    e.preventDefault()
    if (isLoading) return
    loginUser(emailInput, passwordInput)
    console.log("sub");
  }

  useEffect(() => {
    if (user) navigate("/")
  }, [user])

  return (
    <div className='login page flex'>
      <div className='loginDiv container flex column'>
        <h1 className='centerText mb2'>Log in</h1>
        <form className='flex column' onSubmit={submitLoginHandler} >
          <input className='mb2' type="email" onChange={(e) => setEmailInput(e.target.value)} value={emailInput} placeholder='Email...' required />
          <input className='mb1' type="password" onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} placeholder='Password...' required />
          {error &&
            <p className='mt0 mb2 error'>{error}</p>
          }
          <Link to={"/register"} className='mt0 mb2 registerLink'>Don't have an account? Click <strong>HERE</strong> to register.</Link>
          <button className='btn mb2'> Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login
