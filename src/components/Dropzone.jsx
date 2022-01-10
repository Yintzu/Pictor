import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useUpload from '../hooks/useUpload'

const Dropzone = ({ user, albums, albumNameInput }) => {
  const { uploadImg, isLoading, progress, uploadError } = useUpload()
  
  const onDrop = useCallback(acceptedFiles => {
    if (!acceptedFiles.length) return

    uploadImg(acceptedFiles[0], albumNameInput)
  }, [user, albums, albumNameInput])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    maxFiles: 1,
    onDrop,
  })

  return (
    <div className='dropzone flex' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ?
        isDragAccept ?
          <p>File(s) seems good to upload!</p>
          :
          <p>Invalid file type</p>
        :
        <p>Click or drag pics here to upload!</p>
      }
    </div>
  )
}

export default Dropzone
