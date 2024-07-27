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
    orderBy,
  } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { onSnapshot} from 'firebase/firestore';
import { createDocument, createDocumentCustomId, updateDocument } from "../../../../firebase/firebaseActions";
import { parseDate } from "../../../../utility/getDate";
import { useAuthContext } from "../../../../context/AuthContext";


export const useFetchEmployees = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const {profile} = useAuthContext()
  
    // console.log('here',colName,wherequery)
    useEffect(() => {
      const q = query(
          collection(db, 'users'),
          where('companyId','==',profile.companyId),
          orderBy('fullname')
        );
  
     // Subscribe to the query snapshot
     const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData =[];
      snapshot.forEach((doc) => {
       fetchedData.push({id:doc().id,...doc().data})
      });
      setData(fetchedData);
      setError(null);
    }, (err) => {
      setError(err.message);
      setData([]);
    });
  
      // Cleanup function to unsubscribe from snapshot listener
      return () => unsubscribe();
    }, []); // Re-run effect if documentPath changes
  
    return { data, error };
  }