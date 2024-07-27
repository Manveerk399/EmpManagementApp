import { useEffect, useState } from 'react';
import { doc, onSnapshot,collection, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../context/AuthContext';

export const useFetchShifts = (date) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {profile} = useAuthContext()
  const [loading,setLoading] = useState(true)


  // console.log('here',colName,wherequery)
  useEffect(() => {
    const q =collection(db, 'EmployeeShifts', profile.companyId, date)
       
    
    

   // Subscribe to the query snapshot
   const unsubscribe = onSnapshot(q, (snapshot) => {
    setLoading(true)
    const fetchedData =[];
    snapshot.forEach((doc) => {
      
      fetchedData.push({id:doc.id,...doc.data()})
      
     
    });
    // console.log('in hereeee',fetchedData)
    setData({[date]:fetchedData});
    setError(null);
    
  setLoading(false)
  }, (err) => {
    setError(err.message);
    setData([]);
    
  setLoading(false)
  });


    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, [date,profile?.companyId]); // Re-run effect if documentPath changes

  return { data, error ,loading};
};