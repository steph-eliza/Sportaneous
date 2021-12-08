import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

initializeApp({
  projectId: "project-61d45",
});

const db = getFirestore();

export default db;
