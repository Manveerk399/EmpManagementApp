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
import { db } from "../../firebase/config";
import { onSnapshot} from 'firebase/firestore';
import { createDocument, createDocumentCustomId, updateDocument } from "../../firebase/firebaseActions";
import { parseDate } from "../../utility/getDate";
import moment from 'moment';


const weekends=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export const getShiftsByDateAndCompanyId = async (date, companyId) => {
    try {
      const empshift = collection(db, 'EmployeeShifts', companyId, date);
      const querySnapshot = await getDocs(empshift);
  
      let shifts = [];

      querySnapshot.forEach((doc) => {
        //console.log({ id: doc.id, ...doc.data() })
        shifts.push({ id: doc.id, ...doc.data() });
      });

    
  
      return shifts;
    } catch (error) {
      //console.error('Error getting shifts:', error);
      return [];
    }
  };
  
  export const getShiftsByDateAndCompanyIdEmp = async (date, companyId,emp) => {
    try {
       // Define the reference to the specific document
    const docRef = doc(db, 'EmployeeShifts', companyId, date, emp);

    // Fetch the document
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists
      console.log('Document data:', docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // Document does not exist
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document: ', error);
    return null;
  }
  };


export const savingShifts=async(data)=>{
// Parse start and end dates
console.log('saving here',data)

const startDate = parseDate(data.from)
const endDate = parseDate(data.to)

const conflicts =[]

// console.log(startDate,endDate)

let currentDate = startDate
//  // Loop through dates until endDate
 while (currentDate <= endDate) {
    // console.log('looping date',currentDate.getDay())

    
    const isweekend = data.shifttime.weekends.includes(weekends[currentDate.getDay()])
    const date = currentDate.toISOString().split('T')[0]
    const shifts = await getShiftsByDateAndCompanyId(date,data.companyId)

    // console.log('shifts',shifts)

    if(shifts.length===0){

        // let shiftArray=[]

    data.employees.forEach(async(emp)=>
        {
        const shift ={
            date:date,
            shiftname:data.shiftname,
            time:`${data.shifttime.from} - ${data.shifttime.to}`,
            emp:emp,
            shiftid:data.shifttime.id
        }
        // shiftArray.push(shift)
        try {

          isweekend ? ''
          
          :await setDoc(doc(db, 'EmployeeShifts', data.companyId, date,emp), shift);
         
      } catch (error) {
          console.error("Error clocking in: ", error);
      }

    })

    // createDocument('EmployeeShifts',newshift)

    }
    else if(shifts.length>0){

        // console.log('here')

        const previousShifts = shifts


        data.employees.forEach(async(emp)=>{

            const exists = previousShifts?.find(shift => shift.emp === emp )

            if (exists){
                conflicts.push(`A shift already exists for the employee ${emp} on ${moment(date).format('DD MMMM YYYY')}`)
            }

            else {
    
            const shift ={
                        date:date,
                        shiftname:data.shiftname,
                        time:`${data.shifttime.from} - ${data.shifttime.to}`,
                        emp:emp,
                        shiftid:data.shifttime.id
                    }
                    
                    try {

                      isweekend ?''
                      
                      :await setDoc(doc(db, 'EmployeeShifts', data.companyId, date,emp), shift);
                     
                  } catch (error) {
                      console.error("Error adding shift: ", error);
                  }

                }

        })

    
    }

 currentDate.setDate(currentDate.getDate() + 1);
  }


  if(conflicts.length > 0){
    alert(conflicts.join('\n'))
  }


}


export const changingShifts=async(data)=>{
  // Parse start and end dates
 
  
  const startDate = parseDate(data.from)
  const endDate = parseDate(data.to)
  
  
  
  // console.log(startDate,endDate)
  
  let currentDate = startDate
  //  // Loop through dates until endDate
   while (currentDate <= endDate) {
      // console.log('looping date',currentDate.getDay())
  
      
     
      const date = currentDate.toISOString().split('T')[0]
      // const shifts = await getShiftsByDateAndCompanyId(date,data.companyId)
  
      // console.log('shifts',shifts[0]?.shifts,date)
  
      
      // if(shifts.length>0){
  
          // console.log('here')
  
          // const previousShifts = shifts
          // let new_shifts=[]
  
          data.employees.forEach(async(emp)=>{
            const shift = await getShiftsByDateAndCompanyIdEmp(date,data.companyId,emp)

            // console.log('changing',shift,emp)

            if(shift){
              const new_shift = {
                    ...shift,
                    shiftname:data.shiftname,
                    shiftid:data.shifttime.id,
                    time:`${data.shifttime.from} - ${data.shifttime.to}`,

              }

              try {

                await setDoc(doc(db, 'EmployeeShifts', data.companyId, date,emp), new_shift);
               
            } catch (error) {
                console.error("Error adding shift: ", error);
            }


            }
          })
  
    
      
  
   currentDate.setDate(currentDate.getDate() + 1);
    }
  
  
  
  
  
  }




  export const deleteShifts=async(data)=>{
    // Parse start and end dates
    
    
    const startDate = parseDate(data.from)
    const endDate = parseDate(data.to)
    
    
    
    // console.log(startDate,endDate)
    
    let currentDate = startDate
    //  // Loop through dates until endDate
     while (currentDate <= endDate) {
        // console.log('looping date',currentDate.getDay())
    
        
        
        const date = currentDate.toISOString().split('T')[0]
        // const shifts = await getShiftsByDateAndCompanyId(date,data.companyId)
    
        // console.log('shifts',shifts)
    
        
        // if(shifts){
    
        //     console.log('here')
    
        //     const previousShifts = shifts[0].shifts
        //     let new_shifts=[]
    
        data.employees.forEach(async(emp)=>
              {
                await deleteDoc(doc(db, 'EmployeeShifts', data.companyId, date,emp));

        })
    
            
        // }
    
     currentDate.setDate(currentDate.getDate() + 1);
      }
    
    
    
    
    
    }
 