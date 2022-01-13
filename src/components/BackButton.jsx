import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = ({ absolute }) => {
  const navigate = useNavigate()

  const styles = {
    alignSelf: 'start',
  }

  const stylesAbsolute = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
  }

  return (
    <div className='backButton' style={absolute ? stylesAbsolute : styles} >
      <FontAwesomeIcon icon={faChevronCircleLeft} size='3x' onClick={() => navigate(-1)} style={{cursor: 'pointer'}}/>
    </div>
  )
}

export default BackButton
