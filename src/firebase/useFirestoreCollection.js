import { useEffect, useState } from 'react';
import { db } from './config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';


const useFirestoreCollection = (collectionName,order) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Define the query with ordering by the 'fullname' field
    const q = query(collection(db, collectionName), orderBy(order));
    const unsubscribe =onSnapshot(q,
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setData(items);
          setLoading(false);
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );

    return () => {
      unsubscribe();
    };
  }, [collectionName]); // Re-run effect whenever collectionName changes

  return { data, loading, error };
};

export default useFirestoreCollection;