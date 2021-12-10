import React from 'react'
import { firebaseApp } from './utils/firestoreConfig'
import { Splash } from './components/Splash.screen/Splash.component'
import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  firebaseApp
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Splash />
      </NavigationContainer>
    </UserProvider>
  )
}
