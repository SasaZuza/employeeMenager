import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Const in which we add 'firebaseConfig.js' file
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()