import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { collection, query, onSnapshot, where } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { db } from '../services/Firebase'

const FetchImagesContext = createContext()
export const useFetchImages = () => useContext(FetchImagesContext)

const FetchImagesContextProvider = ({ children }) => {
  const { user } = useAuth()
  const [albums, setAlbums] = useState(null)
  const unsub = useRef(() => { })

  useEffect(() => {
    // Handles fetching of albums with collection watchers and unsubs/swaps them when changing user.
    unsub.current()
    if (user) {
      const collectionRef = collection(db, user.uid)
      const queryRef = query(collectionRef, where("owner", "==", user.uid))

      unsub.current = onSnapshot(queryRef, (querySnapshot) => {
        let docs = []
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() })
        })
        setAlbums(docs)
      })
    } else setAlbums([])
  }, [user])


  const values = {
    albums
  }

  return (
    <FetchImagesContext.Provider value={values}>
      {children}
    </FetchImagesContext.Provider>
  )
}

export default FetchImagesContextProvider
