import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByc-ElaQ0G3hKakAJTao76vR-_Ul5HiN8",
  authDomain: "crud-5a546.firebaseapp.com",
  projectId: "crud-5a546",
  storageBucket: "crud-5a546.appspot.com",
  messagingSenderId: "472784394770",
  appId: "1:472784394770:web:0986bd4fe031d5e2cd96cb"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);