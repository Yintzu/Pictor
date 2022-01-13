import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

const ReviewLink = ({ user, album }) => {
  const linkEl = useRef()
  const copiedEl = useRef()

  const link = `${window.location.origin}/review/${user.uid}/${album.id}`

  const handleCopyClick = () => {
    copiedEl.current.style.animation = 'copied 2s'
    navigator.clipboard.writeText(linkEl.current.innerText)
  }

  const handleCopyDown = () => {
    copiedEl.current.style.animation = ''
  }

  return (
    <div className='reviewLinkDiv'>
      <strong>Review Link: </strong>
      <span className='reviewLink' ref={linkEl}>
        {link}
      </span>
      <span className='relative'>
        <span className='copied' ref={copiedEl}>Copied!</span>
        <FontAwesomeIcon icon={faCopy} className='copyIcon' onClick={handleCopyClick} onMouseDown={handleCopyDown} />
      </span>
    </div>
  )
}

export default ReviewLink
