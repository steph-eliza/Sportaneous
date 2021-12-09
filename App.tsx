import React, { useState } from 'react'
import { Nav } from './components/Nav.view/Nav.component'
import { firebaseApp } from './utils/firestoreConfig'
import { getAuth } from '@firebase/auth'
import { SplashScreen } from './components/Splash.screen/splash.component'
import { NavigationContainer } from '@react-navigation/native'

const auth = getAuth()

export default function App() {
  firebaseApp

  const [userExist, setUserExist] = useState(false)

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserExist(true)
    }
  })

  if (!userExist) {
    return <SplashScreen />
  }
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  )
}
