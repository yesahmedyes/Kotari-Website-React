import firebase from 'firebase'

const config={
  apiKey: "AIzaSyAkIT5lwk1CSy3Kdvd0_sb0vbtfIqy1qmM",
  authDomain: "kotari-37bf9.firebaseapp.com",
  projectId: "kotari-37bf9",
  storageBucket: "kotari-37bf9.appspot.com",
  messagingSenderId: "235454845991",
  appId: "1:235454845991:web:04096ae2e5bb8906842a02",
  measurementId: "G-135RB2JVDT"
}
const firebaseApp=firebase.initializeApp(config);
const db = firebaseApp.firestore();

export { firebase,db };
