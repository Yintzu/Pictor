import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Navbar.css'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  return (
    <nav className='navbar flex'>
      <Link to="/" className='navLogo'>Pictor</Link>
      <div className='navMenu'>
        {user &&
          <>
            <span>{user.email}</span>
            <span className='navLogout' onClick={logoutUser}>Log out</span>
          </>
        }
        {
          user === false &&
          <Link to="/login" className='navLogin'>Log in</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar