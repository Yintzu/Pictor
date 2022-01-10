import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

const LikeButtons = ({ reviewedImages, currentImage, wrapperClassName, handleLike }) => {

  const checkStatus = () => {
    const reviewedImage = reviewedImages.find(item => item.id === currentImage.id)
    if (!reviewedImage) return null
    return reviewedImage.liked
  }

  return (
    <div className={wrapperClassName}>
      <FontAwesomeIcon icon={faThumbsUp} className={`likeBtn ${!checkStatus() && 'unselectedLike'}`} onClick={() => handleLike(currentImage, true)} />
      <FontAwesomeIcon icon={faThumbsDown} className={`dislikeBtn ${checkStatus() === false ? '' : 'unselectedLike'}`} onClick={() => handleLike(currentImage, false)} />
    </div>
  )
}

export default LikeButtons
