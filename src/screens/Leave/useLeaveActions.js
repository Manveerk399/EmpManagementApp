import { db } from '../../firebase/config';
import { useState } from 'react';
import { collection, doc, setDoc, getDoc,getDocs,query,where,updateDoc } from 'firebase/firestore';
import { createDocument } from '../../firebase/firebaseActions';


export const useLeaveAction=()=> {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchAllLeaves = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'leave'));
      const leaves = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return leaves;
    } catch (error) {
      console.error('Error fetching all leave documents: ', error);
      throw error;
    }
  };

    
  const fetchLeaveData = async (uid) => {
    try {
      const q = query(collection(db, 'leave'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const leaves = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return leaves;
    } catch (error) {
      console.error(`Error fetching leave documents for UID ${uid}: `, error);
      throw error;
    }
  };




    const addLeave = async (profile, leaveData) => {
      try {
        const payload ={
          ...leaveData,
          user:profile.fullname,
          uid:profile.uid,
        }

        await createDocument('leave',payload)
  
      
        
      } catch (error) {
        console.log(error.message)
      }
      };

      const updateLeaveStatus = async (leaveId, newStatus ,user) => {
        try {
          const leaveRef = doc(collection(db, 'leave'), leaveId);
          await updateDoc(leaveRef, {
            status: newStatus,
            actiontext:`${newStatus} by`,
            by:user
          });
          console.log(`Leave status updated to: ${newStatus}`);
        } catch (error) {
          console.error('Error updating leave status: ', error);
        }
      };


    return {
        addLeave,
        fetchLeaveData,
        updateLeaveStatus
    }

}