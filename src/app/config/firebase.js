import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDCgYxlMB0yXmifec4gQUrHunWqsNWj3Gs',
  authDomain: 'revents-205917.firebaseapp.com',
  databaseURL: 'https://revents-205917.firebaseio.com',
  projectId: 'revents-205917',
  storageBucket: 'revents-205917.appspot.com',
  messagingSenderId: '126546604814'
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
