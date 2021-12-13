import React, { useState, useContext, ReactNode } from 'react'
import {
  Button,
  TextInput,
  SafeAreaView,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  addNewEvent,
  addNewChatroom,
  addNewEventToCurrentUserProfile,
} from '../../utils/utils'
import { UserContext } from '../../contexts/UserContext'
import { styles } from './AddEvent.style'
import DateTimePicker from '@react-native-community/datetimepicker'

type AddEventProps = {
  navigation: {
    navigate: (component: string, {}) => {}
  }
}

export const AddEvent = ({ navigation }: AddEventProps) => {
  const { currentUser } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('')
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<Date>()

  const changeSelectedDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date
    setDate(currentDate)
  }
  const changeSelectedTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time
    setTime(currentTime)
  }

  const resetEventData = () => {
    setTitle('')
    setCategory('')
    setDescription('')
    setLocation('')
    setMaxCapacity('')
    setDate(undefined)
    setTime(undefined)
  }

  const handlePress = async () => {
    const eventId = await addNewEvent({
      title: title,
      category: category,
      description: description,
      location: location,
      max_capacity: maxCapacity,
      date: date?.toDateString(),
      time: time?.toTimeString().slice(0, 5),
      host_id: currentUser.id,
      attendees: [],
      pending_attendees: [],
    })
    addNewChatroom(
      { host_id: currentUser.id, attendees_id: [], messages: [] },
      eventId
    )
    addNewChatroom(
      { host_id: currentUser.id, attendees_id: [], messages: [] },
      eventId
    )
    addNewEventToCurrentUserProfile(currentUser.id, eventId)
    resetEventData()
    navigation.navigate('Event', { eventId })
  }

  const HideKeyboard = ({ children }: { children: ReactNode }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )

  const isDisabled = !(
    title &&
    description &&
    location &&
    maxCapacity &&
    date &&
    time
  )

  return (
    <SafeAreaView style={styles.container}>
      <HideKeyboard>
        <ScrollView>
          <Text>Please add your event details</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={setTitle}
            value={title}
            placeholder="title"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setCategory}
            value={category}
            placeholder="category"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setDescription}
            value={description}
            placeholder="description"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setLocation}
            value={location}
            placeholder="city"
          />
          <TextInput
            style={styles.inputField}
            onChangeText={setMaxCapacity}
            value={maxCapacity}
            placeholder="how many people can join?"
          />
          <Text>select date and time</Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date || new Date()}
            mode={'date'}
            display="default"
            onChange={changeSelectedDate}
          />
          <DateTimePicker
            testID="dateTimePicker"
            value={time || new Date()}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={changeSelectedTime}
          />
          <Button
            onPress={handlePress}
            color="black"
            title="Post"
            disabled={isDisabled}
          />
        </ScrollView>
      </HideKeyboard>
    </SafeAreaView>
  )
}

export default AddEvent
