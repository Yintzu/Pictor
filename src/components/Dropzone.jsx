import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useUpload from '../hooks/useUpload'

const Dropzone = ({ user, albums, albumNameInput }) => {
  const { uploadImg, isLoading, progress, setProgress, uploadError } = useUpload()

  const onDrop = useCallback(async acceptedFiles => {
    if (!acceptedFiles.length) return

    console.log(`acceptedFiles`, acceptedFiles)

    for (let i = 0; i < acceptedFiles.length; i++) {
      setProgress(null)
      await uploadImg(acceptedFiles[i], albumNameInput)
    }

  }, [user, albums, albumNameInput])

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/gif, image/jpeg, image/png, image/webp',
    maxFiles: 10,
    onDrop,
  })

  return (
    <div className='dropzone flex' {...getRootProps()}>
      <div className='progressBar' style={{width: `${progress}%`}}>
      </div>

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
