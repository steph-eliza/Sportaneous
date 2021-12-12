import React from 'react'
import { createContext, ReactNode, useState } from 'react'
import { getAuth } from 'firebase/auth'

export const UserContext = createContext<any>(undefined)
const auth = getAuth()
export const UserProvider = ({ children }: { children: ReactNode }) => {
  
  const [currentUser, setCurrentUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    hosted_events: [],
    requested_events: [],
    image_bitmap: '',
  })

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
