import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH,db } from '../firebase/config';
import { getEmployeesByUID } from '../firebase/firebaseActions';
import { CommonActions } from '@react-navigation/native';
import { onSnapshot, doc,where,query,collection } from 'firebase/firestore';
import { getShiftsByDateAndCompanyId } from '../screens/Shifts/ShiftActions';
import { getCurrentDate } from '../utility/getDate';


const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};




export const setupProfileListener =async (uid, setProfile,setCompany,setShift) => {
  const profileQuery = query(
    collection(db, 'users'),
    where('uid', '==', uid)
  );

  // let compid= null
  // let userid = null

  const {yyyy_mm_dd:date} = getCurrentDate()

  // console.log(date,compid)

  
  const profileListener = onSnapshot(profileQuery,(snapshot) => {
    snapshot.forEach(async(doc) => {
      setProfile(doc.data());
      
      if(doc.data().companyId){
       const shift = await getShiftsByDateAndCompanyId(date,doc.data().companyId)
      //  console.log('shifts',shifts[0]?.shifts.find(s => s.emp === doc.data().uid))

       setShift(shift.find(s => s.emp === doc.data().uid))
      setupCompanyListener(doc.data().companyId,setCompany)
      }
    });
  });

 

  

  return profileListener;
};






export const setupCompanyListener =(companyId, setCompanyInfo) => {
  const companyDocRef = doc(db, 'companies', companyId);

  const companyListener = onSnapshot(companyDocRef, (snapshot) => {
    // console.log(snapshot)
    if (snapshot.exists()) {
      setCompanyInfo({id:companyId,...snapshot.data()});
    } else {
      console.error('No such document in companies collection!');
    }
  });

  return companyListener;
};



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile ,setProfile] = useState(null)
  const [companyInfo,setCompanyInfo]=useState(null)
  const [shift,setShift]=useState(null)
  const [attendanceSettings,setAttendanceSetting]=useState(null)

  

  const settingsListener =(prof) => {
    const q = query(
      collection(db, 'attendanceSettings'),
      where('companyId', '==', prof.companyId)
    );
  
    // console.log('fetch',profile.companyId)
   
  
    
    const listener = onSnapshot(q,(snapshot) => {

      
      snapshot?.forEach((doc) => {
        
        setAttendanceSetting(doc.data());
      });
    });
  

  
    return listener;
  };
  

  

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);

      if (user) {
        const profileListener = setupProfileListener(user.uid, setProfile,setCompanyInfo,setShift);
        
        
        return () => {
          profileListener();
        };
      } else {
        setLoading(false);
        // Clear profile and companyInfo state when user logs out
        setProfile(null);
        setCompanyInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // useEffect(()=>{

  //   if(profile){
  //     const listener = settingsListener(profile)
  //     return () => {
  //       listener();
  //     };
  //   }else{
  //     setAttendanceSetting(null)
  //   }

  // },[])



  // console.log(attendanceSettings)

 

  return (
    <AuthContext.Provider value={{ user, loading,profile,setCompanyInfo,companyInfo ,shift,attendanceSettings}}>
      {children}
    </AuthContext.Provider>
  );
};
