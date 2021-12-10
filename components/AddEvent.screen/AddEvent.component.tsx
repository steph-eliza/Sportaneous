import React, { useState, useContext } from 'react'
import { Button, TextInput, SafeAreaView, Text } from 'react-native'
import { UserContext } from '../../contexts/UserContext'
import { addNewEvent, addNewChatroom } from '../../utils/utils'
import { styles } from './AddEvent.style'

type AddEventProps = {
  navigation: {
    navigate: (component: string, {}) => {}
  }
}

export const AddEvent = ({ navigation }: AddEventProps) => {
  const { currentUser } = useContext(UserContext)
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    max_capacity: 0,
    host_id: 'MqFbwzzuLbOhneGLtDs',
  })

  const handleChange = (text: string, stateKey: string) => {
    setEventDetails({ ...eventDetails, [stateKey]: text })
  }

  const handlePress = async () => {
    const eventId = await addNewEvent(eventDetails)
    addNewChatroom(
      { host_id: 'MqFbwzzuLbOhneGLtDs', attendees_id: [], messages: [] },
      eventId
    )
    navigation.navigate('Event', { eventId })
  }

  console.log(eventDetails)

  return (
    <SafeAreaView style={styles.container}>
      <Text>Please add your event details</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'title')}
        placeholder="title"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'description')}
        placeholder="description"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'location')}
        placeholder="city"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'date')}
        placeholder="date"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'time')}
        placeholder="time"
      />
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => handleChange(text, 'max_capacity')}
        placeholder="how many people can join?"
      />
      <Button
        onPress={handlePress}
        color="black"
        title="Post"
        // disabled={isDisabled}
      />
    </SafeAreaView>
  )
}

export default AddEvent
