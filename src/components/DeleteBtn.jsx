import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useUpload from '../hooks/useUpload'

const DeleteBtn = ({ album }) => {
  const { deleteAlbum } = useUpload()

  const handleDeleteAlbum = (e) => {
    e.preventDefault()
    e.stopPropagation()
    deleteAlbum(album)
  }

  const styles = {
    background: 'var(--ERROR_COLOR)',
    color: 'var(--PRIMARY_LIGHT)',
    fontSize: '2rem',
    padding: '0.3rem',
    borderRadius: '5px',
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem'
  }

  return (
    <FontAwesomeIcon icon={faTrashAlt} style={styles} onClick={handleDeleteAlbum} />
  )
}

export default DeleteBtn
