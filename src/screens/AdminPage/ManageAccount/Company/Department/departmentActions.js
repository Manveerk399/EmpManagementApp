import { useEffect, useState } from "react"
import { useAuthContext } from "../../../../../context/AuthContext"
import { db } from "../../../../../firebase/config"
import { onSnapshot, doc,where,query,collection, orderBy,getDocs } from 'firebase/firestore';

export const usefetchFormData=()=>{
    const [data,setData]=useState({})
    const [error,setError]=useState(null)
    const {profile}=useAuthContext()
    const [loading,setLoading]=useState(true)


    const fetchData =async() => {
        try {
          const q = query(
            collection(db, 'users'),
            where('companyId', '==', profile?.companyId),
            orderBy('fullname')
          );
      
          const querySnapshot = await getDocs(q);

          console.log('fetching here',querySnapshot.docs)
      
          const fetchedData = querySnapshot.docs.map((doc) => ({
            key: doc.data().uid,
            value: doc.data().fullname
          }));
      
          setData({ ...data, leaderOptions: fetchedData });
          setError(null);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err.message);
          setData({ ...data, leaderOptions: [] }); // Clear leaderOptions on error
          setLoading(false);
        }
      
      };
    


    // console.log('here',colName,wherequery)
  useEffect(() => {
   
     fetchData();
    

    // Cleanup function to unsubscribe from all snapshot listeners
    // return () => {
    //   unsubscribe1();
      
    // };
    
  }, []); // Re-run effect if documentPath changes


 
  return {data,loading}

}


