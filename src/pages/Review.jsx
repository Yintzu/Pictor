import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../services/Firebase'
import useUpload from '../hooks/useUpload'
import ImageGrid from '../components/ImageGrid'
import Lightbox from '../components/Lightbox'
import Alert from '../components/Alert'
import '../styles/Review.css'

const Review = () => {
  const { userId, albumId } = useParams()
  const { createNewAlbum, success } = useUpload()
  const [album, setAlbum] = useState()
  const [lightboxDisplayImg, setLightboxDisplayImg] = useState(null)
  const [reviewedImages, setReviewedImages] = useState([])
  const [reviewerName, setReviewerName] = useState('')
  const [pleaseReviewAll, setPleaseReviewAll] = useState(null)

  const handleLike = (image, verdict) => {
    setReviewedImages(prev => {
      const alreadyReviewed = prev.find(item => item.id === image.id)
      let tempArray = [...prev]

      //If already clicked, filters out the image first
      if (alreadyReviewed) tempArray = tempArray.filter(item => item.id !== image.id)

      //Then returns array with image removed if you "unclick a like"
      if (alreadyReviewed?.liked === verdict) return [...tempArray]

      return [...tempArray, { ...image, liked: verdict }]
    })
  }

  const handleOk = (e) => {
    e.preventDefault()
    setPleaseReviewAll(false)
  }

  const submitReviewedAlbum = (e) => {
    e.preventDefault()

    if (reviewedImages.length !== album.images.length) return setPleaseReviewAll(true)

    const imagesToSend = reviewedImages.filter(item => item.liked === true).map(item => {
      const newItem = { ...item }
      delete newItem.liked
      return newItem
    })

    createNewAlbum(`${album.name}-${reviewerName}-${Date.now()}`, imagesToSend, userId)
    setReviewedImages(null)
  }

  useEffect(() => {
    //Supports real time update if photographer wants to add photos while you review lolol.
    const docRef = doc(db, userId, albumId)

    const unsub = onSnapshot(docRef, (doc) => {
      setAlbum({ id: doc.id, ...doc.data() })
    })

    return unsub
  }, [])

  return (
    <div className='page flex'>
      <div className='container flex column justifyBetween'>
        {album && <div className='w100'>
          <h1 className='centerText'>{album.name}</h1>
          <ImageGrid album={album} setLightboxDisplayImg={setLightboxDisplayImg} reviewedImages={reviewedImages} handleLike={handleLike} />
        </div>
        }
        {success ?
          <Alert message={success} />
          : album && reviewedImages &&
          <form onSubmit={submitReviewedAlbum} className='submitReviewedDiv'>
            {!pleaseReviewAll &&
              <p className='centerText bold'>{reviewedImages.filter(item => item.liked === true).length} of {album.images.length} images liked.</p>
            }
            {pleaseReviewAll ? <div className='flex'>
              <p className='mx1'>Please review all images</p>
              <button onClick={handleOk} className='btn submitReviewedBtn'>Ok</button>
            </div>
              :
              <div className='submitReviewedInputWrapper'>
                <input type="text" value={reviewerName} placeholder="Reviewer's name..." onChange={(e) => setReviewerName(e.target.value)} />
                <button className='btn submitReviewedBtn' type='submit'>Done</button>
              </div>
            }
          </form>
        }
        {lightboxDisplayImg &&
          <Lightbox album={album} lightboxDisplayImg={lightboxDisplayImg} setLightboxDisplayImg={setLightboxDisplayImg} handleLike={handleLike} reviewedImages={reviewedImages} />
        }
      </div>
    </div>
  )
}

export default Review
