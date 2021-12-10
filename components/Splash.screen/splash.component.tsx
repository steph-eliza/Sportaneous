import React, { useState, useContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import PhoneSignIn from '../Auth.screen/Auth.component'
import { UserContext } from '../../contexts/UserContext'
import { Nav } from '../Nav.view/Nav.component'
import { Text } from 'react-native-elements'
import { Screen } from 'react-native-screens'
import { getUserById } from '../../utils/utils'
import GetUserName from '../GetUserName.screen/GetUserName.component'
import {styles} from "./Splash.style"

export const Splash= () => {

  const auth = getAuth()
  
  const [isLoading, setIsLoading] = useState(true)
  const [reLoad , setReload] = useState(false)
  const [userAuth, setUserAuth] = useState(false)
  const {currentUser, setCurrentUser} = useContext(UserContext)

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setIsLoading(true)
      setUserAuth(false)
      setReload(false)
      if (user) {
        setIsLoading(false)
        setUserAuth(true)
        getUserById(user.uid)
          .then((res)=>{
            setCurrentUser(res)
        }).catch((err)=>{
            console.log(err)
        })
      }else{ 
        setUserAuth(false)
        setIsLoading(false)
      }
    })
  },[reLoad])
  
  console.log(currentUser)
  if (isLoading) return (<Screen style={styles.loadingText} ><Text>Welcome to NBC</Text></Screen>)
  if (!userAuth) return <PhoneSignIn />
  if (!currentUser) return <GetUserName setReload={setReload}/>
  return <Nav/>
}