import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useFetchImages } from '../contexts/FetchImagesContext'
import useUpload from '../hooks/useUpload'
import BackButton from '../components/BackButton'
import ImageGrid from '../components/ImageGrid'
import AlbumTitle from '../components/AlbumTitle'
import Dropzone from '../components/Dropzone'
import ReviewLink from '../components/ReviewLink'
import Lightbox from '../components/Lightbox'
import '../styles/Album.css'

const Album = () => {
  const { user } = useAuth()
  const { createNewAlbum } = useUpload()
  const { albums } = useFetchImages()
  const { id } = useParams()
  const [currentAlbum, setCurrentAlbum] = useState()
  const [albumNameInput, setAlbumNameInput] = useState()
  const [newAlbumFromSelectedInput, setNewAlbumFromSelectedInput] = useState('')
  const [checkedImages, setCheckedImages] = useState([])
  const [lightboxDisplayImg, setLightboxDisplayImg] = useState(null)

  const handleNewAlbumFromSelected = (e) => {
    e.preventDefault()
    if (albums.some(album => album.name === newAlbumFromSelectedInput)) return console.log("found album with same name")
    createNewAlbum(newAlbumFromSelectedInput, checkedImages)
  }

  useEffect(() => {
    if (albums) {
      const album = albums.find(album => album.id === id)
      setCurrentAlbum(album)
      setAlbumNameInput(album.name)
    }
  }, [albums])

  if (!currentAlbum) return null
  return (
    <div className='album page flex'>
      <div className='albumDiv container flex column justifyBetween'>
        {currentAlbum &&
          <>
            <div className='w100'>
              <BackButton />
              <AlbumTitle album={currentAlbum} albumNameInput={albumNameInput} setAlbumNameInput={setAlbumNameInput} />
              <ImageGrid album={currentAlbum} setCheckedImages={setCheckedImages} setLightboxDisplayImg={setLightboxDisplayImg} />
            </div>
            <div className='w100'>
              <ReviewLink user={user} album={currentAlbum} />
              {checkedImages.length ?
                <>
                  <form className='newFromSelected flex' onSubmit={handleNewAlbumFromSelected}>
                    <p>Create new album from selected images:</p>
                    <input type="text" className='newFromSelectedInput' onChange={(e) => setNewAlbumFromSelectedInput(e.target.value)} value={newAlbumFromSelectedInput} placeholder='New album name...' required />
                    <button className='btn newFromSelectedBtn'>Create</button>
                  </form>
                  <form className='deleteSelected flex' onSubmit={null}>
                    <p>Delete selected images?</p>
                    <button className='btn deleteSelectedBtn'>Delete</button>
                  </form>
                </>
                : null
              }
              <Dropzone albums={albums} user={user} albumNameInput={albumNameInput} />
            </div>
          </>
        }
        {lightboxDisplayImg &&
          <Lightbox album={currentAlbum} lightboxDisplayImg={lightboxDisplayImg} setLightboxDisplayImg={setLightboxDisplayImg} />
        }
      </div>
    </div>
  )
}

export default Album
