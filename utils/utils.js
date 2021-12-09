import { db } from "./firestoreConfig.js";
import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export const selectAllEvents = () => {
  return getDocs(collection(db, "events"))
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventsByUser = (userId) => {
  const q = query(collection(db, "events"), where("host_id", "==", userId));
  return getDocs(q)
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventById = (eventId) => {
  const docRef = doc(db, "events", eventId);
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data();
    console.log(event);
    return event;
  });
};

export const addNewEvent = (newEvent) => {
  return addDoc(collection(db, "events"), newEvent).then((res) => {
    console.log(res.id);
    return res.id;
  });
};

export const addNewUser = (newUser) => {
  return addDoc(collection(db, "users"), newUser).then((res) => {
    console.log(res.id);
    return res.id;
  });
};

export const addNewChatroom = (newChatroom) => {
  return addDoc(collection(db, "chats"), newChatroom).then((res) => {
    console.log(res.id);
    return res.id;
  });
};

// MVP just leaving it as one filter instead of complex.
export const selectFilteredEvents = (location) => {
  const q1 = query(collection(db, "events"), where("location", "==", location));
  return getDocs(q1)
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteUser = (userId) => {
  return deleteDoc(doc(db, "users", userId)).then(() => {
    console.log("user deleted!");
  });
};

export const deleteEvent = (eventId) => {
  return deleteDoc(doc(db, "events", eventId)).then(() => {
    console.log("event deleted!");
  });
};

export const deleteChatroom = (chatId) => {
  return deleteDoc(doc(db, "chats", chatId)).then(() => {
    console.log("chatroom deleted!");
  });
};
