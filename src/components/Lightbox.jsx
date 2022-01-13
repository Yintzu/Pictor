import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faChevronRight, faChevronLeft, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import '../styles/Lightbox.css'
import LikeButtons from './LikeButtons'

const Lightbox = ({ album, lightboxDisplayImg, setLightboxDisplayImg, handleLike, reviewedImages }) => {

  const handlePreviousImg = () => {
    const currentIndex = album.images.indexOf(lightboxDisplayImg)
    if (currentIndex > 0) setLightboxDisplayImg(album.images[currentIndex - 1])
    else setLightboxDisplayImg(album.images[album.images.length - 1])
  }

  const handleNextImg = () => {
    const currentIndex = album.images.indexOf(lightboxDisplayImg)
    if (currentIndex < (album.images.length - 1)) setLightboxDisplayImg(album.images[currentIndex + 1])
    else setLightboxDisplayImg(album.images[0])
  }

  return (
    <div className='lightboxOverlay'>
      <div className='lightboxImgWrapper'>
        <img src={lightboxDisplayImg.url} alt={lightboxDisplayImg.name} className='lightboxImg' />
        {reviewedImages &&
          <LikeButtons wrapperClassName={"lightboxReviewIconWrapper"} reviewedImages={reviewedImages} currentImage={lightboxDisplayImg} handleLike={handleLike} />
        }
      </div>
      <div className='prevImgOverlay' onClick={handlePreviousImg}>
        <FontAwesomeIcon icon={faChevronLeft} className='lightboxNavBtn'  />
      </div>
      <div className='nextImgOverlay' onClick={handleNextImg}>
        <FontAwesomeIcon icon={faChevronRight} className='lightboxNavBtn'  onClick={() => setLightboxDisplayImg(null)} />
      </div>
      <FontAwesomeIcon icon={faTimesCircle} className='lightboxCloseBtn' size='4x' onClick={() => setLightboxDisplayImg(null)} />
    </div>
  )
}

export default Lightbox
