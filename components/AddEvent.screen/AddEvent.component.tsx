import React, { useState, useContext } from 'react'
import { Button, TextInput, SafeAreaView, Text, ScrollView } from 'react-native'
import { UserContext } from '../../contexts/UserContext'
import { addNewEvent, addNewChatroom } from '../../utils/utils'
import { styles } from './AddEvent.style'
import {
  PickerTime,
  PickerDate,
  PickerItem,
} from 'react-native-ultimate-modal-picker'

type AddEventProps = {
  navigation: {
    navigate: (component: string, {}) => {}
  }
}

export const AddEvent = ({ navigation }: AddEventProps) => {
  const { currentUser } = useContext(UserContext)
  const [ date, setDate ] = useState<any>(new Date().toString());
  const [ time, setTime ] = useState<Date>(new Date());
  const [ fromDate, setFromDate ] = useState<Date>(new Date());
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    date: date,
    time: time,
    max_capacity: '',
    host_id: currentUser.id,
    attendees: [],
    pending_attendees: [],
  })

  const handleChange = (text: string, stateKey: string) => {
    setEventDetails({ ...eventDetails, [stateKey]: text })
  }

  const handlePress = async () => {
    const eventId = await addNewEvent(eventDetails)
    addNewChatroom(
      { host_id: currentUser.id, attendees_id: [], messages: [] },
      eventId
    )
    navigation.navigate('Event', { eventId: eventId })
  }

  console.log(date, '>>>>date')
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        onChangeText={(text) => handleChange(text, 'max_capacity')}
        placeholder="how many people can join?"
      />
      <PickerDate
          title="Date"
          onChange={(date: Date) => setDate(date)}
          mode="spinner"
        />
      <PickerTime
          title="Date/Time"
          onChange={(date: Date) => setTime(date)}
          mode="spinner"
        />
      <Button
        onPress={handlePress}
        color="black"
        title="Post"
        // disabled={isDisabled}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddEvent
