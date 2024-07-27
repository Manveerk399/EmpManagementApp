import { db } from "./config";
import {
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  where,
  query,
  addDoc,
  getDocs,
} from "firebase/firestore";


export const createDocument = async (colName, payload) => {

    const filterCollection = collection(db, colName);

   
    try {
      await addDoc(filterCollection, payload);
    } catch (error) {
      console.log(error)
    }
  
    return true;
  };

export const createDocumentCustomId = async (colName, payload,docId) => {

    const filterCollection = collection(db, colName,docId);

   
    try {
      await addDoc(filterCollection, payload);
    } catch (error) {
      console.log(error)
    }
  
    return true;
  };

export const updateDocument = async (colName,payload) => {
  console.log('here',colName,payload)
    const docRef = doc(db, colName, payload.id);
    
    try {
      await setDoc(docRef, payload);
      console.log(`Document ${payload.id} successfully updated in collection ${colName}`);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error; // Optionally re-throw the error to handle it further up the call stack
    }
  };

export const createDocumentNoDup = async (colName, payload,property,text) => {
    const collectionRef = collection(db, colName);
    try {
      // Check if the companyname already exists
      const q = query(collectionRef, where(property, '==', payload[property]));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        throw new Error(`${text} with name '${payload[property]}' already exists.`);
      }
  
      // Add the document with companyname as the document ID
      await addDoc(collectionRef, payload);
  
      console.log(`${text} '${payload[property]}' added successfully.`);
      return true;
    } catch (error) {
      // console.error('Error adding:', error.message);
      throw error;
    }
  };


export const getEmployeesByUID = async (uid) => {
    try {
      console.log('here',uid)
      // Create a query to filter documents by UID
      const q = query(collection(db, 'users'), where('uid', '==', uid));
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      // Initialize an array to store the results
      const employees = [];
  
      // Iterate over the documents in the query snapshot
      querySnapshot.forEach(doc => {
        // Add each document's data to the array
        employees.push(doc.data());
      });
  
      // Return the array of employee data
      return employees;
    } catch (error) {
      // Handle any errors
      console.error("Error getting employees by UID:", error);
      throw error;
    }
  };



  export const deleteFilterDocumentData = async (colName, id) => {
    const docRef = doc(db, colName, id);
    try {
      await deleteDoc(docRef);
    } catch (error) {}
  
    return true;
  };