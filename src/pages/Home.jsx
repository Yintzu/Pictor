import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import '../styles/Home.css'
import { useFetchImages } from '../contexts/FetchImagesContext'
import useUpload from '../hooks/useUpload'
import DeleteBtn from '../components/DeleteBtn'

const Home = () => {
  const { albums } = useFetchImages()
  const { createNewAlbum } = useUpload()
  const [newMode, setNewMode] = useState(false)
  const [newAlbumNameInput, setNewAlbumNameInput] = useState('')
  const newAlbumNameInputRef = useRef()

  const handleOk = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!newAlbumNameInput) return
    createNewAlbum(newAlbumNameInput)
    setNewMode(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setNewAlbumNameInput('')
    setNewMode(false)
  }

  useEffect(() => {
    if (newMode) newAlbumNameInputRef.current.focus()
  }, [newMode])

  return (
    <div className='home page flex'>
      <div className='homeDiv container'>
        <div className='albumGrid'>
          <div className='albumGridItem flex column' onClick={() => setNewMode(true)}>
            <FontAwesomeIcon icon={faFolderPlus} size='6x' />
            {newMode ?
              <form action="submit" className='relative'>
                <input type='text' value={newAlbumNameInput} className='newAlbumNameInput' ref={newAlbumNameInputRef} onChange={(e) => setNewAlbumNameInput(e.target.value)} placeholder='Album name...' required />
                <div className='newAlbumBtnWrapper'>
                  <button className='newAlbumBtn btn' onClick={handleOk}>OK</button>
                  <button className='newAlbumBtn btn' onClick={handleCancel}>Cancel</button>
                </div>
              </form>
              :
              <p className='albumGridItemText my0'> Add new album</p>
            }

          </div>
          {albums && albums.map(album => (
            <Link to={`/album/${album.id}`} className='albumGridItem flex column' key={album.id}>
              <DeleteBtn album={album} />
              <FontAwesomeIcon icon={faFolderOpen} size='6x' />
              <p>{album.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div >
  )
}

export default Home
