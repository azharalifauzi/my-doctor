import firebase from '@react-native-firebase/app';

import '@react-native-firebase/messaging';
import '@react-native-firebase/database';
require('@react-native-firebase/auth');
import '@react-native-firebase/analytics';

export const Fire = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyA0xIkNstMMclgSMAlnEBFDcy9UwACZX0o',
      authDomain: 'my-doctor-6306a.firebaseapp.com',
      databaseURL: 'https://my-doctor-6306a.firebaseio.com',
      projectId: 'my-doctor-6306a',
      storageBucket: 'my-doctor-6306a.appspot.com',
      messagingSenderId: '616745744961',
      appId: '1:616745744961:web:15465dbca73684ba18e4c0',
      measurementId: 'G-FYRF7RXSB0',
    })
  : firebase.app();

export const messaging = firebase.messaging();
