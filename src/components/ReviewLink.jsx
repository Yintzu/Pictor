import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const ReviewLink = ({ user, album }) => {
  const linkEl = useRef()

  const link = `${window.location.origin}/review/${user.uid}/${album.id}`

  return (
    <div className='reviewLinkDiv'>
      <span className='reviewLink' ref={linkEl}>{link}</span>
      <FontAwesomeIcon icon={faCopy} className='copyIcon' onClick={() => navigator.clipboard.writeText(linkEl.current.innerText)} />
    </div>
  )
}

export default ReviewLink
