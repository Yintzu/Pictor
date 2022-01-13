import React from 'react'
import '../styles/ImageGrid.css'
import LikeButtons from './LikeButtons'

const ImageGrid = ({ album, setCheckedImages, setLightboxDisplayImg, reviewedImages, handleLike }) => {

  const handleCheck = (e, image) => {
    if (e.target.checked) setCheckedImages(prev => [...prev, image])
    else setCheckedImages(prev => prev.filter(item => item.id !== image.id))
  }

  return (
    <div className='imageGrid'>
      {album.images.map(image => (
        <div className='imageGridItem' key={image.id}>
          <img src={image.url} className='imageGridItem' onClick={() => setLightboxDisplayImg(image)} />
          {setCheckedImages &&
            <input type="checkbox" className='imgCheckbox' onChange={(e) => handleCheck(e, image)} />
          }
          {reviewedImages &&
            <LikeButtons reviewedImages={reviewedImages} handleLike={handleLike} currentImage={image} wrapperClassName={'imageGridLikeWrapper'} />
          }
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
