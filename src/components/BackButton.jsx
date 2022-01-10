import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = ({ absolute }) => {
  const navigate = useNavigate()

  const styles = {
    cursor: 'pointer',
    alignSelf: 'start',
  }

  const stylesAbsolute = {
    cursor: 'pointer',
    position: 'absolute',
    top: '1rem',
    left: '1rem',
  }

  return (
    <div className='backButton' style={absolute ? stylesAbsolute : styles} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faChevronCircleLeft} size='3x' />
    </div>
  )
}

export default BackButton
