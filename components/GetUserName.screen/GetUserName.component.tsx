import { View, Text, Button, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { styles } from './GetUserName.style'
import { addNewUser } from '../../utils/utils'
import { useNavigation } from '@react-navigation/native'
import { getUserById } from '../../utils/utils'
import { Screen } from 'react-native-screens'


const auth = getAuth()

const GetUserName = ({setReload}) => {

  const [isLoading, setIsLoading] =useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const user = { first_name: firstName, last_name: lastName }

  const isDisabled = firstName === '' || lastName === ''

  const handlePress = () => {
    if (auth.currentUser) {
      addNewUser(user, auth.currentUser.uid)
      setReload(true)
    }
  }

  useEffect(()=>{
    setIsLoading(true)
    auth.onAuthStateChanged((user) => {
      if(user){
        getUserById(user.uid)
        .then(()=>{
          setIsLoading(false)
        }).catch((err)=>{
          console.log(err)
        })
      }
    })
  },[])

  if(isLoading) return <Screen style={styles.loadingText}><Text>Welcome to NBC</Text></Screen>
  return (
    <View style={styles.container}>
      <Text>Hello! What's your name?</Text>
      <Text>First Name:</Text>
      <TextInput
        style={styles.inputName}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="first name"
      />
       <Text>Last Name:</Text>
      <TextInput
        style={styles.inputName}
        onChangeText={setLastName}
        value={lastName}
        placeholder="last name"
      />
      <Button
        onPress={handlePress}
        color="blue"
        title="Submit"
        disabled={isDisabled}
      />
    </View>
  )
}

export default GetUserName
