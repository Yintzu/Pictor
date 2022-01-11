import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { collection, addDoc, doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore'
import { db, storage } from '../services/Firebase.js'
import { useFetchImages } from '../contexts/FetchImagesContext'
import { idGen } from './utilities'
import { async } from '@firebase/util'

const useUpload = () => {
  const { user } = useAuth()
  const { albums } = useFetchImages()
  const [uploadError, setUploadError] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const uploadImg = async (image, albumName) => {
    if (!image instanceof File) return setUploadError("Invalid image.")
    setUploadError(false)
    setIsLoading(true)

    const storageFileName = `${image.name}-${Date.now()}`
    const storageFilePath = `${user.uid}/${storageFileName}`

    try {
      const storageRef = ref(storage, storageFilePath)

      const uploadTask = uploadBytesResumable(storageRef, image)

      uploadTask.on('state_changed', (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10)
      })

      await uploadTask.then()

      const url = await getDownloadURL(storageRef)

      const imageData = {
        id: idGen(),
        name: image.name,
        owner: user.uid,
        created: Date.now(),
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        url,
      }

      const existingAlbum = albums.find(album => album.name === albumName)

      console.log(`existingAlbum found! Adding img`, existingAlbum)
      console.log("trying to create docRef:", user.id, existingAlbum.id)
      const docRef = doc(db, user.uid, existingAlbum.id)
      await updateDoc(docRef, {
        images: arrayUnion(imageData)
      })


    } catch (e) {
      setUploadError(e)
      console.log("Error: ", e.message)
    } finally {
      setIsLoading(false)
      setProgress(null)
    }
  }

  const updateAlbumName = async (albumId, newName) => {
    setUploadError(false)
    setIsLoading(true)
    try {
      const docRef = doc(db, user.uid, albumId)
      await updateDoc(docRef, {
        name: newName
      })
    } catch (e) {
      setUploadError(e)
      console.log("Error: ", e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewAlbum = async (albumName, images = []) => {
    setUploadError(false)
    setIsLoading(true)
    try {
      const collectionRef = collection(db, user.uid)
      await addDoc(collectionRef, {
        name: albumName,
        owner: user.uid,
        images: images
      })
      setSuccess('Album created successfully!')
    } catch (e) {
      setUploadError(e)
      console.log("Error: ", e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAlbum = async (album) => {
    setUploadError(false)
    setIsLoading(true)

    const otherAlbums = albums.filter(item => item.id !== album.id)

    for (let i = 0; i < album.images.length; i++) {
      let existsInOtherAlbum

      otherAlbums.forEach(otherAlbum => {
        if (!existsInOtherAlbum) existsInOtherAlbum = otherAlbum.images.some(otherAlbumImage => album.images[i].path === otherAlbumImage.path)
      })

      if (!existsInOtherAlbum) {
        try {
          const storageRef = ref(storage, album.images[i].path)
          await deleteObject(storageRef)
        } catch (e) {
          setUploadError(e)
          console.log("Error: ", e.message)
        }
      }
    }

    try {
      const docRef = doc(db, user.uid, album.id)
      await deleteDoc(docRef)

    } catch (e) {
      setUploadError(e)
      console.log("Error: ", e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteImages = async (album, selectedImages) => {
    setUploadError(false)
    setIsLoading(true)
    try {
      const docRef = doc(db, user.uid, album.id)

      let newImages = []
      album.images.forEach(item => {
        if (!selectedImages.some(image => image.id === item.id)) newImages.push(item)
      })

      const otherAlbums = albums.filter(item => item.id !== album.id)

      for (let i = 0; i < selectedImages.length; i++) {
        let existsInOtherAlbum

        otherAlbums.forEach(otherAlbum => {
          if (!existsInOtherAlbum) existsInOtherAlbum = otherAlbum.images.some(otherAlbumImage => selectedImages[i].path === otherAlbumImage.path)
        })

        if (!existsInOtherAlbum) {
          try {
            const storageRef = ref(storage, selectedImages[i].path)
            await deleteObject(storageRef)
          } catch (e) {
            setUploadError(e)
            console.log("Error: ", e.message)
          }
        }
      }

      await updateDoc(docRef, {
        images: newImages
      })
    } catch (e) {
      setUploadError(e)
      console.log("Error: ", e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    uploadImg,
    updateAlbumName,
    createNewAlbum,
    deleteAlbum,
    deleteImages,
    isLoading,
    uploadError,
    progress,
    setProgress,
    success,
  }
}

export default useUpload
