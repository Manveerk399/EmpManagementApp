import { useEffect, useState } from "react"
import { useAuthContext } from "../../../../context/AuthContext";
import { db } from "../../../../firebase/config";
import { onSnapshot, doc,where,query,collection, orderBy,getDocs } from 'firebase/firestore';

export const useFetchDropdowns=()=>{
    const [data,setData]=useState({})
    const [error,setError]=useState(null)
    const {profile}=useAuthContext()
    const [loading,setLoading]=useState(true)


    const fetchData =async() => {
        setLoading(true)
        try {
          const q = query(
            collection(db, 'users'),
            where('companyId', '==', profile?.companyId),
            orderBy('fullname')
          );

          const branches = query(
            collection(db, 'branches'),
            where('companyId', '==', profile?.companyId),
            orderBy('name')
          );

          const department = query(
            collection(db, 'departments'),
            where('companyId', '==', profile?.companyId),
            orderBy('name')
          );


          const jobtitles = query(
            collection(db, 'jobtitles'),
            where('companyId', '==', profile?.companyId),
            orderBy('name')
          );


          const employmenttype = query(
            collection(db, 'Employment Types'),
            where('companyId', '==', profile?.companyId),
            orderBy('name')
          );
      
          const querySnapshot = await getDocs(q);
          const branchSnapshot = await getDocs(branches);
          const deptSnapshot = await getDocs(department);
          const jobtitlesSnapshot = await getDocs(jobtitles);
          const empTypeSnapshot = await getDocs(employmenttype);


          
      
          // const empOpt = querySnapshot.docs.map((doc) => ({
          //   value: doc.data().uid,
          //   label: doc.data().fullname
          // }));

          // const branchesOpt = branchSnapshot.docs.map((doc) => ({
          //   value: doc.id,
          //   label: doc.data().name
          // }));

          // const deptOpt = deptSnapshot.docs.map((doc) => ({
          //   value: doc.id,
          //   label: doc.data().name
          // }));
          // const jobtitlesOpt = jobtitlesSnapshot.docs.map((doc) => ({
          //   value: doc.id,
          //   label: doc.data().name
          // }));
          // const empTypeOpt = empTypeSnapshot.docs.map((doc) => ({
          //   value: doc.id,
          //   label: doc.data().name
          // }));



          const cleanData = (docs, valueField, labelField) =>
            docs.map(doc => ({
              value: doc.id,
              label: doc.data().name
            }));

            const cleanempData = (docs, valueField, labelField) =>
              docs.map(doc => ({
                value: doc.data().uid,
                label: doc.data().fullname
              }));
      
          const empOpt = cleanempData(querySnapshot.docs, 'uid', 'fullname');
          const branchesOpt = cleanData(branchSnapshot.docs, 'id', 'name');
          const deptOpt = cleanData(deptSnapshot.docs, 'id', 'name');
          const jobtitlesOpt = cleanData(jobtitlesSnapshot.docs, 'id', 'name');
          const empTypeOpt = cleanData(empTypeSnapshot.docs, 'id', 'name');


         
      
          setData({
            empOptions:empOpt,
            branchOptions:branchesOpt,
            departmentOptions:deptOpt,
            jobOptions:jobtitlesOpt,
            empTypeOpt:empTypeOpt
          })



          setError(null);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err.message);
          setData({}); // Clear leaderOptions on error
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


  // console.log('fetched',data)
 
  return {data,loading}

}