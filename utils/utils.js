import { db } from './firestoreConfig.js'
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from 'firebase/firestore'

export const selectAllEvents = () => {
  return getDocs(collection(db, 'events')).then((snapshot) => {
    let eventsArray = []
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id })
    })
    return eventsArray
  })
}

export const selectEventsByUser = (userId) => {
  const q = query(collection(db, 'events'), where('host_id', '==', userId))
  return getDocs(q).then((snapshot) => {
    let eventsArray = []
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id })
    })
    return eventsArray
  })
}

export const selectEventById = (eventId) => {
  const docRef = doc(db, 'events', eventId)
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data()
    return event
  })
}

export const addNewEvent = (newEvent) => {
  return addDoc(collection(db, 'events'), newEvent).then((res) => res.id)
}

export const addNewUser = (newUser, uid) => {
  return setDoc(doc(db, 'users', uid), newUser)
}

export const addNewChatroom = (newChatroom, eventId) => {
  return setDoc(doc(db, 'chats', eventId), newChatroom)
}

// MVP just leaving it as one filter instead of complex.
export const selectFilteredEvents = (location) => {
  const q1 = query(collection(db, 'events'), where('location', '==', location))
  return getDocs(q1).then((snapshot) => {
    let eventsArray = []
    snapshot.docs.forEach((doc) => {
      eventsArray.push({ ...doc.data(), id: doc.id })
    })
    return eventsArray
  })
}

export const deleteUser = (userId) => {
  return deleteDoc(doc(db, 'users', userId))
}

export const deleteEvent = (eventId) => {
  return deleteDoc(doc(db, 'events', eventId))
}

export const deleteChatroom = (chatId) => {
  return deleteDoc(doc(db, 'chats', chatId))
}

export const getUsers = () => {
  return getDocs(collection(db, 'users')).then((snapshot) => {
    let usersArray = []
    snapshot.docs.forEach((user) => {
      usersArray.push({ ...user.data(), id: user.id })
    })
    return usersArray
  })
}

export const getUserById = (userId) => {
  const docRef = doc(db, 'users', userId)
  return getDoc(docRef).then((snapshot) => {
    const user = snapshot.data()
    return user
  })
}

export const selectChatById = (chatId) => {
  const docRef = doc(db, 'chats', chatId)
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data()
    return event
  })
}

export const addChatMessage = (chatObject, chatId) => {
  return updateDoc(doc(db, 'chats', chatId), {
    messages: arrayUnion(chatObject),
  })
}

export const deleteChatMessage = (chatObject, chatId) => {
  return updateDoc(doc(db, 'chats', chatId), {
    messages: arrayRemove(chatObject),
  })
}

export const joinEvent = (userDetails, eventId) => {
  return updateDoc(doc(db, 'events', eventId), {
    pending_attendees: arrayUnion(userDetails),
  })
}
