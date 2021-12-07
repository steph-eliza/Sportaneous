const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

initializeApp({
  projectId: 'project-61d45',
});

const db = getFirestore();

module.exports = db