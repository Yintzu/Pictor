import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const RequireAuth = ({ children, redirectTo = "/login" }) => {
  const { user } = useAuth()

  if (user) return children
  return <Navigate to={redirectTo} replace={true} />
}

export default RequireAuth