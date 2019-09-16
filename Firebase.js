import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCw20LNaHmq9YWcv13cxJeM6OaBv7hX5u4',
  authDomain: 'rnfirebasefirestore.firebaseapp.com',
  //databaseURL: 'https://rnfirebasefirestore.firebaseio.com',
  projectId: 'rnfirebasefirestore',
  //storageBucket: 'rnfirebasefirestore.appspot.com',
  //messagingSenderId: '796183433171',
  //appId: '1:796183433171:web:6a77c8c4abba3aca04a926',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {db};
