import { useEffect, useState } from 'react';
import { doc, onSnapshot,collection, query } from 'firebase/firestore';
import { db } from './config';

const useFetchCollection = (colName,wherequery,orderBy=null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading,setloading] = useState(true)

  // console.log('here',colName,wherequery,orderBy)
  useEffect(() => {
    const q =orderBy? query(
        collection(db, colName),
        wherequery,
        orderBy
      ):
      query(
        collection(db, colName),
        wherequery
      )

   // Subscribe to the query snapshot
   setloading(true)
   const unsubscribe = onSnapshot(q, (snapshot) => {
    const fetchedData = [];
    snapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() });
    });
    setData(fetchedData);
    setError(null);
    setloading(false)
  }, (err) => {
    setError(err.message);
    setData([]);
    setloading(false)
  });

    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, [colName]); // Re-run effect if documentPath changes




  return { data, error ,loading};
};

export default useFetchCollection;
