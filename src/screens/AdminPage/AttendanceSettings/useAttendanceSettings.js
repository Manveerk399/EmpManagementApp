import { useEffect, useState } from "react"
import { useAuthContext } from "../../../context/AuthContext";
import { db } from "../../../firebase/config";
import { onSnapshot, doc,where,query,collection, orderBy,getDocs } from 'firebase/firestore';

export const useAttendanceSettings=()=>{
    const [data,setData]=useState({})
    const [error,setError]=useState(null)
    const {profile}=useAuthContext()
    const [loading,setLoading]=useState(true)
    const [exist,setExist]=useState(false)


    const fetchData = () => {
        setLoading(true);
      
        const q = query(
          collection(db, 'attendanceSettings'),
          where('companyId', '==', profile?.companyId)
        );
      
        const listener = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            // Get the first document in the snapshot
            const doc = snapshot.docs[0];
            setData({ id: doc.id, ...doc.data() });
            setExist(true);
            setLoading(false);
          } else {
            setData({
              strict: true,
              lenient: false,
              lenientMode: '',
              strictMode: 'manual',
              strictFullDay: '08:00 hours',
              strictHalfDay: '04:00 hours',
              lenientHours: '00:00 hours',
              maxHours: '00:00 hours',
              allowOvertimeDeviations: true,
              allowMaxHours: true,
              companyId: profile.companyId
            });
      
            setExist(false);
            setLoading(false);
          }
        });
      
        return listener;
      };
      
    


    // console.log('here',colName,wherequery)
  useEffect(() => {
   
     const unsubscribe1 = fetchData()
    

    // Cleanup function to unsubscribe from all snapshot listeners
    return () => {
      unsubscribe1();
      
    };
    
  }, []); // Re-run effect if documentPath changes


  // console.log('fetched',data)
 
  return {data,loading,exist}

}