const usersData = require('../data/users.json')
const eventsData = require('../data/events.json')
const chatsData = require('../data/chats.json')
const { initializeApp} = require("firebase/app");
const {  getFirestore,  doc, setDoc } = require("firebase/firestore");

initializeApp({
  projectId: 'project-61d45'
});

const db = getFirestore();

const userIdArray = Object.keys(usersData)
const eventIdArray = Object.keys(eventsData)
const chatIdArray = Object.keys(chatsData)

const usersCollectionString = userIdArray.map((item) => {
    return `users/${item}`
})

const eventsCollectionString = eventIdArray.map((item) => {
    return `events/${item}`
})

const chatsCollectionString = chatIdArray.map((item) => {
    return `chats/${item}`
})

for(let i = 0; i < userIdArray.length; i++){
    let newPost = doc(db,usersCollectionString[i]);
    let docData = usersData[userIdArray[i]]
    setDoc(newPost, docData)
    .then(()=>{console.log("users test data inputted")})
}

for(let i = 0; i < eventIdArray.length; i++){
    let newPost = doc(db,eventsCollectionString[i]);
    let docData = eventsData[eventIdArray[i]]
    setDoc(newPost, docData)
    .then(()=>{console.log("events test data inputted")})
}

for(let i = 0; i < chatIdArray.length; i++){
    let newPost = doc(db,chatsCollectionString[i]);
    let docData = chatsData[chatIdArray[i]]
    setDoc(newPost, docData)
    .then(()=>{console.log("chats test data inputted")})
}
