import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Navbar.css'

const Navbar = () => {
  const { user, logoutUser } = useAuth()
  const [menu, setMenu] = useState(false)

  const logoutAndCloseMenu = async () => {
    await logoutUser()
    setMenu(false)
  }

  return (
    <nav className='navbar flex'>
      <Link to="/" className='navLogo'>Pictor</Link>
      <div className={`navMenu`}>
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
      <div className='mobileNav'>
        <FontAwesomeIcon icon={faHamburger} className='hamburger' onClick={() => setMenu(prev => !prev)} />
        <div className={`mobileNavMenu ${!menu && 'none'}`}>
          {user &&
            <>
              <span>{user.email}</span>
              <span className='navLogout' onClick={logoutAndCloseMenu} >Log out</span>
            </>
          }
          {
            user === false &&
            <Link to="/login" className='navLogin' onClick={() => setMenu(false)}>Log in</Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar