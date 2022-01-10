import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../services/Firebase'
import useUpload from '../hooks/useUpload'
import ImageGrid from '../components/ImageGrid'
import Lightbox from '../components/Lightbox'
import Alert from '../components/Alert'

const Review = () => {
  const { userId, albumId } = useParams()
  const { createNewAlbum, success } = useUpload()
  const [album, setAlbum] = useState()
  const [lightboxDisplayImg, setLightboxDisplayImg] = useState(null)
  const [reviewedImages, setReviewedImages] = useState([])
  const [reviewerName, setReviewerName] = useState('')

  const handleLike = (image, verdict) => {
    setReviewedImages(prev => {
      const alreadyReviewed = prev.find(item => item.id === image.id)
      let tempArray = [...prev]

      if (alreadyReviewed) tempArray = tempArray.filter(item => item.id !== image.id)

      if (alreadyReviewed?.liked === verdict) return [...tempArray]

      return [...tempArray, { ...image, liked: verdict }]
    })
  }

  const submitReviewedAlbum = (e) => {
    e.preventDefault()

    if (reviewedImages.length !== album.images.length) return console.log("pls review all images")

    const imagesToSend = reviewedImages.filter(item => item.liked === true).map(item => {
      const newItem = { ...item }
      delete newItem.liked
      return newItem
    })

    createNewAlbum(`${album.name}-${reviewerName}-${Date.now()}`, imagesToSend)
    setReviewedImages(null)
  }

  useEffect(() => {
    const docRef = doc(db, userId, albumId)

    const unsub = onSnapshot(docRef, (doc) => {
      setAlbum({ id: doc.id, ...doc.data() })
    })

    return unsub
  }, [])

  useEffect(() => {
    console.log(`reviewedImages`, reviewedImages)
  }, [reviewedImages])

  return (
    <div className='page flex'>
      <div className='container'>
        {album && <>
          <h1 className='centerText'>{album.name}</h1>
          <ImageGrid album={album} setLightboxDisplayImg={setLightboxDisplayImg} reviewedImages={reviewedImages} handleLike={handleLike} />
        </>
        }
        {success &&
          <Alert message={success} />
        }
        {!success &&
          <form onSubmit={submitReviewedAlbum} className='flex'>
            <input type="text" value={reviewerName} placeholder="Reviewer's name..." onChange={(e) => setReviewerName(e.target.value)} />
            <button className='btn'>Done</button>
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
