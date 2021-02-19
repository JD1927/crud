import { firebaseApp } from './firebase-conf';
import * as firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

// Collections
export const collections = {
  TASKS: 'tasks',
}

export const getCollection = async (collection) => {
  const result = { status: false, data: undefined, error: undefined };
  try {
    const fetchData = await db.collection(collection).get();
    const data = fetchData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    result.status = true;
    result.data = [...data];
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async ({ collection, data }) => {
  const result = { status: false, data: undefined, error: undefined };
  try {
    const response = await db.collection(collection).add(data);
    result.data = { id: response?.id };
    result.status = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const getDocumentByID = async ({ collection, id }) => {
  const result = { status: false, data: undefined, error: undefined };
  try {
    const response = await db.collection(collection).doc(id).get();

    result.data = { id: response?.id, ...response?.data };
    result.status = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateDocumentByID = async ({ collection, id, data }) => {
  const result = { status: false, error: undefined };
  try {
    await db.collection(collection).doc(id).update(data);
    result.status = true;
  } catch (error) {
    result.error = error;
  }
  return result;
}

export const deleteDocumentByID = async ({ collection, id }) => {
  const result = { status: false, error: undefined };
  try {
    await db.collection(collection).doc(id).delete();
    result.status = true;
  } catch (error) {
    result.error = error;
  }
  return result;
}
