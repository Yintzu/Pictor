import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import useUpload from '../hooks/useUpload'

const AlbumTitle = ({ album, albumNameInput, setAlbumNameInput }) => {
  const { updateAlbumName, isLoading } = useUpload()
  const [editMode, setEditMode] = useState(false)
  const [oldName, setOldName] = useState(albumNameInput)

  const handleSaveName = () => {
    if (oldName === albumNameInput) return setEditMode(false)
    updateAlbumName(album.id, albumNameInput)
    setOldName(albumNameInput)
    setEditMode(false)
  }

  return (
    <>
      {editMode ?
        <div className='flex'>
          <span className='flex'>
            <input type='text' className='titleInput mb2' value={albumNameInput} onChange={(e) => setAlbumNameInput(e.target.value)} disabled={isLoading} />
            <button className='titleBtn btn py0' onClick={handleSaveName} style={{ alignSelf: 'start', height: 'var(--INPUT_HEIGHT)' }} disabled={isLoading}>Save</button>
          </span>
        </div>
        :
        <h1 className='centerText mb2 mt0' style={{ height: 'var(--INPUT_HEIGHT)' }}>
          <span style={{ position: 'relative' }}>
            {album.name}
            <FontAwesomeIcon icon={faPen} style={{ position: 'absolute', right: 'calc(0px - 3rem)', bottom: '5px', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setEditMode(true)} />
          </span>
        </h1>
      }
    </>
  )
}

export default AlbumTitle
