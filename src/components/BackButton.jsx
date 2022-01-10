import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = () => {
  const navigate = useNavigate()

  const styles = {
    cursor: 'pointer',
    position: 'absolute',
    top: '1rem',
    left: '1rem',
  }

  return (
    <div className='backButton' style={styles} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faChevronCircleLeft} size='4x'/>
    </div>
  )
}

export default BackButton
