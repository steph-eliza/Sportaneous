import { db } from "./firestoreConfig.js";
import { collection, getDocs, getDoc, query, where, doc, setDoc, addDoc, createId } from "firebase/firestore";


export const selectAllEvents = () => {
  return getDocs(collection(db, "events"))
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventsByUser = (user_id) => {
  const q = query(collection(db, "events"), where("host_id", "==", user_id));
  return getDocs(q)
    .then((snapshot) => {
      let eventsArray = [];
      snapshot.docs.forEach((doc) => {
        eventsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(eventsArray);
      return eventsArray
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectEventById = (eventId) => {
  const docRef = doc(db, "events", eventId);
  return getDoc(docRef).then((snapshot) => {
    const event = snapshot.data()
    console.log(event)
    return event
});
}
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
      return eventsArray
    })
    .catch((err) => {
      console.log(err);
    });
};




// This is not getting into the promise chain

export const addNewEvent = (newEvent) => {
  console.log("ASOMETHINGSDG")

  return addDoc(collection(db, "events"), newEvent)
    .then((result) => {
      console.log("Success")
      console.log(result)
      return newEvent.id
    })
}





// Filtered selection of all events

// Delete functionality