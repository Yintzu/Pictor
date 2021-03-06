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
  const { createNewAlbum, deleteImages, success, setSuccess } = useUpload()
  const { albums } = useFetchImages()
  const { id } = useParams()
  const [currentAlbum, setCurrentAlbum] = useState()
  const [albumNameInput, setAlbumNameInput] = useState()
  const [nameEditMode, setNameEditMode] = useState(false)
  const [newAlbumFromSelectedInput, setNewAlbumFromSelectedInput] = useState('')
  const [newFromSelectedInfo, setNewFromSelectedInfo] = useState(null)
  const [checkedImages, setCheckedImages] = useState([])
  const [lightboxDisplayImg, setLightboxDisplayImg] = useState(null)

  const handleNewAlbumFromSelected = (e) => {
    e.preventDefault()
    if (albums.some(album => album.name === newAlbumFromSelectedInput)) return setNewFromSelectedInfo('An album with that name already exists.')
    createNewAlbum(newAlbumFromSelectedInput, checkedImages)
  }

  const handleDeleteSelected = () => {
    deleteImages(currentAlbum, checkedImages)
    setCheckedImages([])
  }

  //Finds the album to display depending on url params
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
              <AlbumTitle album={currentAlbum} albumNameInput={albumNameInput} setAlbumNameInput={setAlbumNameInput} nameEditMode={nameEditMode} setNameEditMode={setNameEditMode} />
              <ImageGrid album={currentAlbum} setCheckedImages={setCheckedImages} setLightboxDisplayImg={setLightboxDisplayImg} />
            </div>
            <div className='w100'>
              <ReviewLink user={user} album={currentAlbum} />
              {checkedImages.length ?
                <>
                  {newFromSelectedInfo ?
                    <div className='newFromSelected flex'>
                      <p>{newFromSelectedInfo}</p>
                      <button className='btn newFromSelectedBtn mx1' onClick={() => setNewFromSelectedInfo(null)}>Ok</button>
                    </div>
                    :
                    success ?
                      <div className='newFromSelected flex'>
                        <p>New album created successfully! ????</p>
                        <button className='btn newFromSelectedBtn mx1' onClick={() => setSuccess(null)}>Ok</button>
                      </div>
                      :
                      <form className='newFromSelected flex' onSubmit={handleNewAlbumFromSelected}>
                        <p>Create new album from selected images:</p>
                        <div className='newFromSelectedInputWrapper' style={{ width: '100%', maxWidth: '500px' }}>

                          <input type="text" className='newFromSelectedInput' onChange={(e) => setNewAlbumFromSelectedInput(e.target.value)} value={newAlbumFromSelectedInput} placeholder='New album name...' required />
                          <button className='btn newFromSelectedBtn'>Create</button>
                        </div>
                      </form>
                  }
                  <div className='deleteSelected flex'>
                    <p>Delete selected images?</p>
                    <button className='btn deleteSelectedBtn' onClick={handleDeleteSelected}>Delete</button>
                  </div>
                </>
                : null
              }
              <Dropzone albums={albums} user={user} albumNameInput={albumNameInput} nameEditMode={nameEditMode}/>
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
