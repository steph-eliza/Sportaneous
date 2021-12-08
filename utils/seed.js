const { db } = require("./firestoreConfig");
const { doc, setDoc } = require("firebase/firestore");
const usersData = require("../data/users.json");
const eventsData = require("../data/events.json");
const chatsData = require("../data/chats.json");

exports.seedData = () => {
  const userIdArray = Object.keys(usersData);
  const eventIdArray = Object.keys(eventsData);
  const chatIdArray = Object.keys(chatsData);

  const usersCollectionString = userIdArray.map((item) => `users/${item}`);

  const eventsCollectionString = eventIdArray.map((item) => `events/${item}`);

  const chatsCollectionString = chatIdArray.map((item) => `chats/${item}`);

  for (let i = 0; i < userIdArray.length; i++) {
    const newPost = doc(db, usersCollectionString[i]);
    const docData = usersData[userIdArray[i]];
    console.log(docData);
    setDoc(newPost, docData).then(() => {
      console.log("users test data inputted");
    });
  }

  for (let i = 0; i < eventIdArray.length; i++) {
    const newPost = doc(db, eventsCollectionString[i]);
    const docData = eventsData[eventIdArray[i]];
    setDoc(newPost, docData).then(() => {
      console.log("events test data inputted");
    });
  }

  for (let i = 0; i < chatIdArray.length; i++) {
    const newPost = doc(db, chatsCollectionString[i]);
    const docData = chatsData[chatIdArray[i]];
    setDoc(newPost, docData).then(() => {
      console.log("chats test data inputted");
    });
  }
};

exports.seedData();
