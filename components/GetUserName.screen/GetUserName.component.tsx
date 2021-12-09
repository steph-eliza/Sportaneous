import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { styles } from './GetUserName.style'
import { addNewUser } from '../../utils/utils'

const auth = getAuth()

export function GetUserName({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const user = { first_name: firstName, last_name: lastName }

  const isDisabled = firstName === '' || lastName === ''

  const handlePress = () => {
    if (auth.currentUser) {
      addNewUser(user, auth.currentUser.uid)
      navigation.navigate('EventList')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello! What's your name?</Text>
      <TextInput
        style={styles.inputName}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="first name"
      />
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
