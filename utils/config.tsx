import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import {DB_APIKEY,DB_AUTHDOMAIN, DB_URL,  DB_BUCKET} from "@env";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const config = {
    apiKey: DB_APIKEY ,
    authDomain: DB_AUTHDOMAIN,
    databaseURL: DB_URL,
    storageBucket: DB_BUCKET
};

initializeApp(config);

export function storeData() {
    const db = getDatabase();
    const reference = ref(db, 'user');
    set(reference, {
        bob : "Hello",
        joke1: "I'm afraid for the calendar. Its days are numbered.",
        joke2: "My wife said I should do lunges to stay in shape. That would be a big step forward.",
        joke3: "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one!",
        joke4:"Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
        joke5: "What do a tick and the Eiffel Tower have in common? They're both Paris sites.",
        joke6: "What do you call a fish wearing a bowtie? Sofishticated.",
        joke7: "How do you follow Will Smith in the snow? You follow the fresh prints.",
        joke8: "If April showers bring May flowers, what do May flowers bring? Pilgrims.",
        joke9: "I thought the dryer was shrinking my clothes. Turns out it was the refrigerator all along.",
      });
      getData()
  }

export function getData() {
const db = getDatabase();
const reference = ref(db, 'user');
onValue(reference, (snapshot) => {
    const clickEvent = snapshot.val().joke1;
    console.log(clickEvent)
    });
}