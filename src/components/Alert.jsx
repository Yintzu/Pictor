import React from 'react'
import '../styles/Alert.css'

const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default Alert
