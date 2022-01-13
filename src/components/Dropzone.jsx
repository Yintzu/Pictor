import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useUpload from '../hooks/useUpload'

const Dropzone = ({ user, albums, albumNameInput, nameEditMode }) => {
  const { uploadImg, progress, setProgress, uploadError } = useUpload()
  const [uploadMessage, setUploadMessage] = useState(null)

  const onDrop = useCallback(async acceptedFiles => {
    if (!acceptedFiles.length || nameEditMode) return

    for (let i = 0; i < acceptedFiles.length; i++) {
      setProgress(null)
      setUploadMessage(`Images uploaded... ${i}/${acceptedFiles.length}`)
      await uploadImg(acceptedFiles[i], albumNameInput)
    }

    setUploadMessage(null)
    setProgress(0)
  }, [user, albums, albumNameInput, nameEditMode])

  const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    maxFiles: 10,
    onDrop,
  })

  const renderInfoMessage = () => {
    if (uploadError) return uploadError
    if (uploadMessage) return uploadMessage
    if (nameEditMode) return "Decide on an album name first dawg."
    if (isDragActive && isDragAccept) return "File(s) seems good to upload!"
    return "Click or drag pics here (max 10) to upload!"
  }

  return (
    <div className='dropzone flex' {...getRootProps()}>
      <div className='progressBar' style={{ width: `${progress}%` }}>
      </div>
      {!nameEditMode &&
        <input {...getInputProps()} />
      }
      <p>{renderInfoMessage()}</p>
    </div>
  )
}

export default Dropzone
