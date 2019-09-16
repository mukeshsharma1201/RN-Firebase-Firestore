import {db} from '../../Firebase';

export const addUserData = function(key, email, fname, lname) {
  return new Promise((resolve, reject) => {
    db.collection('users')
      .doc(key + '')
      .set({
        email,
        fname,
        lname,
      })
      .then(function(docRef) {
        console.log('Document written successfully: ', docRef);
        resolve(docRef);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
        reject(error);
      });
  });
};

export const getAllUsersData = function(params) {
  return new Promise((resolve, reject) => {
    db.collection('users')
      .get()
      .then(resolve)
      .catch(reject);
  });
};

export const listenForChange = function(callback) {
  db.collection('users').onSnapshot(function(querySnapshot) {
    // console.log('Current data: ', doc.data());
    const data = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    console.log(data); // array of cities objects
    callback(data);
  });
};

export const listenForOneDoc = function(callback) {
  db.collection('users')
    .doc('1568383920857')
    .onSnapshot(function(doc) {
      console.log(doc.data());
      callback({
        id: doc.id,
        ...doc.data(),
      });
    });
};

export const fireQuery = function() {
  return new Promise((resolve, reject) => {
    db.collection('users')
      .where('fname', '==', 'Abhishek')
      .get()
      .then(function(querySnapshot) {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        resolve(data);
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
        reject(error);
      });
  });
};
