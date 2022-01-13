import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import useUpload from '../hooks/useUpload'

const AlbumTitle = ({ album, albumNameInput, setAlbumNameInput, nameEditMode, setNameEditMode }) => {
  const { updateAlbumName, isLoading } = useUpload()
  const [oldName, setOldName] = useState(albumNameInput)

  const handleSaveName = () => {
    if (oldName === albumNameInput) return setNameEditMode(false)
    updateAlbumName(album.id, albumNameInput)
    setOldName(albumNameInput)
    setNameEditMode(false)
  }

  return (
    <>
      {nameEditMode ?
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
            <FontAwesomeIcon icon={faPen} style={{ position: 'absolute', right: 'calc(0px - 3rem)', bottom: '5px', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setNameEditMode(true)} />
          </span>
        </h1>
      }
    </>
  )
}

export default AlbumTitle
