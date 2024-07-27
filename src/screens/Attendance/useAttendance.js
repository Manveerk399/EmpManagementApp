import { db } from '../../firebase/config';
import { useState } from 'react';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { useAuthContext } from '../../context/AuthContext';
const moment = require('moment');



export const useAttendance=()=> {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {profile,attendanceSettings,shift} = useAuthContext()



    
  const fetchAttendanceData = async (date,companyId) => {
    
    try {
      const attendanceRef = collection(db, 'attendance', companyId, date);
  
      // Get the document for the specified date
      const attendanceDoc = await getDocs(attendanceRef);
      const data = [];

      if(attendanceDoc.empty){
        return []
      }

      else{

      attendanceDoc.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data

    }
     
     
        
     
    } catch (error) {
      console.error('Error fetching attendance data: ', error);
      return [];
    }
  };


  // Function to convert hours string (e.g., "06:00 hours") to moment duration
function parseHoursString(hoursString) {
  
  const [hours, minutes] = hoursString.split(' ')[0].split(':');
  return moment.duration({ hours: parseInt(hours), minutes: parseInt(minutes) }).asHours();
}



function calculateAttendance(clockInTime, clockOutTime) {
  const { from, to, before, after } = shift.shiftname.value;
  const {
      allowMaxHours,
      allowOvertimeDeviation,
      lenient,
      lenientHours,
      lenientMode,
      maxHours,
      strict,
      strictMode,
      strictFullDay,
      strictHalfDay
  } = shift.shiftname.attendanceSettings || null;

  console.log(shift.shiftname.value)

  // Get correct time format
  const shiftStartTime = moment(from, 'hh:mm A');
  const shiftEndTime = moment(to, 'hh:mm A');
  const marginBeforeShiftStart = parseHoursString(before); // Example margin before shift start time
  const marginAfterShiftEnd = parseHoursString(after); // Example margin after shift end time

  // Convert clock-in and clock-out times to moment objects
  const checkInTime = moment(clockInTime, 'hh:mm A');
  const checkOutTime = moment(clockOutTime, 'hh:mm A');

  // Calculate the actual margin start and end times
  const marginStartTime = shiftStartTime.clone().subtract(marginBeforeShiftStart, 'hours');
  const marginEndTime = shiftEndTime.clone().add(marginAfterShiftEnd, 'hours');

  const shiftHours = moment.duration(shiftEndTime.diff(shiftStartTime)).asHours();

  // Adjust check-in and check-out times based on margins
  const validCheckInTime = checkInTime.isBefore(marginStartTime) ? marginStartTime : checkInTime;
  const validCheckOutTime = checkOutTime.isAfter(marginEndTime) ? marginEndTime : checkOutTime;

  // Calculate worked hours based on actual check-in and check-out times
  let workedHours = moment.duration(validCheckOutTime.diff(validCheckInTime)).asHours();

  // Calculate payable hours based on the official shift time
  const payableStartTime = validCheckInTime.isBefore(shiftStartTime) ? shiftStartTime : validCheckInTime;
  const payableEndTime = validCheckOutTime.isAfter(shiftEndTime) ? shiftEndTime : validCheckOutTime;
  const payableHours = moment.duration(payableEndTime.diff(payableStartTime)).asHours();


  if (!attendanceSettings){
      // Initialize deviation and overtime
  let deviation = 0;
  let overtime = 0;

  let attendanceStatus = '';
      const strictFullDayHours = shiftHours;
      const strictHalfDayHours = shiftHours / 2;

      if (workedHours >= strictFullDayHours) {
          attendanceStatus = 'Full Day Present';
          if (workedHours > shiftHours && checkOutTime.isAfter(marginEndTime)  && allowOvertimeDeviation) {
              overtime = moment.duration(checkOutTime.diff(marginEndTime)).asHours();
          }
      } else if (workedHours >= strictHalfDayHours) {
          attendanceStatus = 'Half Day Present';
          deviation = shiftHours - workedHours;
      } else {
          attendanceStatus = 'Half Day Absent';
          deviation = shiftHours - workedHours;
      }

      return {
        attendanceStatus,
        payableHours,
        workedHours,
        overtime,
        deviation
    }

  }

  else{

  // if(workedHours)
  if (allowMaxHours) {
      // Cap the worked hours to maxHours
      if (workedHours > parseHoursString(maxHours)) {
          workedHours = parseHoursString(maxHours);
      }
  }

  // Initialize deviation and overtime
  let deviation = 0;
  let overtime = 0;

  let attendanceStatus = '';

  if (strict) {
      const strictFullDayHours = strictMode === 'manual' ? parseHoursString(strictFullDay) : shiftHours;
      const strictHalfDayHours = strictMode === 'manual' ? parseHoursString(strictHalfDay) : shiftHours / 2;

      if (workedHours >= strictFullDayHours) {
          attendanceStatus = 'Full Day Present';
          if (workedHours > shiftHours && checkOutTime.isAfter(marginEndTime)  && allowOvertimeDeviation) {
              overtime = moment.duration(checkOutTime.diff(marginEndTime)).asHours();
          }
      } else if (workedHours >= strictHalfDayHours) {
          attendanceStatus = 'Half Day Present';
          deviation = shiftHours - workedHours;
      } else {
          attendanceStatus = 'Half Day Absent';
          deviation = shiftHours - workedHours;
      }
  } else if (lenient) {
      const lenientRequiredHours = lenientMode === 'shift' ? shiftHours : parseHoursString(lenientHours);

      if (payableHours >= lenientRequiredHours) {
          attendanceStatus = 'Present';
          if (workedHours>shiftHours && checkOutTime.isAfter(marginEndTime) && allowOvertimeDeviation) {
              overtime = moment.duration(checkOutTime.diff(marginEndTime)).asHours();
          }
      } else {
          attendanceStatus = 'Absent';
          if (allowOvertimeDeviation) {
              deviation = shiftHours - payableHours;
          }
      }
  } else {
      const requiredHours = shiftHours; // Default to shift hours if neither lenient nor strict
      attendanceStatus = payableHours >= requiredHours ? 'Present' : 'Absent';
  }


  return {
      attendanceStatus,
      payableHours,
      workedHours,
      overtime,
      deviation
  }
}
}



function test(){
  // Example usage
const shift = {
  from: '09:00 AM',
  to: '06:00 PM',
  before: '1:00', // 1 hour before
  after: '0:00'   // 0 hours after
};

const attendanceSettingsStrict = {
  allowMaxHours: true,
  allowOvertimeDeviation: true,
  lenient: false,
  lenientHours: '08:00 hours',
  lenientMode: '',
  maxHours: '08:00 hours',
  strict: true,
  strictMode: 'manual',
  strictFullDay: '08:00 hours',
  strictHalfDay: '04:00 hours'
};

const attendanceSettingsLenient = {
  allowMaxHours: true,
  allowOvertimeDeviation: true,
  lenient: true,
  lenientHours: '08:00 hours',
  lenientMode: 'manual',
  maxHours: '08:00 hours',
  strict: false,
  strictMode: '',
  strictFullDay: '08:00 hours',
  strictHalfDay: '04:00 hours'
};

// Example 1: Strict Mode with manual settings
console.log(calculateAttendance('04:00 PM', '11:00 PM', shift, attendanceSettingsStrict));

// // Example 2: Strict Mode with manual settings
// console.log(calculateAttendance('05:00 AM', '03:00 PM', shift, attendanceSettingsStrict));

// // Example 3: Lenient Mode with manual settings
// console.log(calculateAttendance('08:00 AM', '08:00 PM', shift, attendanceSettingsLenient));

// // Example 4: Lenient Mode with manual settings
// console.log(calculateAttendance('04:00 PM', '11:00 PM', shift, attendanceSettingsLenient));
}







    const addAttendanceRecord = async (date, attendanceData) => {
        try {
          // Create a reference to the attendance document for the specified date
          const attendanceRef = doc(collection(db, 'attendance'), date);
      
          // Get the existing data for the specified date
          const attendanceDoc = await getDoc(attendanceRef);
        
//console.log('Attendance document data:', attendanceDoc.data()[date]);

      
          if (attendanceDoc.exists()) {
            // If the document exists, merge existing data with new attendanceData
            const existingAttendanceData = attendanceDoc.data()[date] || [];
            console.log('Attendance document data:', existingAttendanceData);
            const mergedAttendanceData = [...existingAttendanceData,attendanceData];
      
            // Update the document with the merged attendanceData
            await setDoc(attendanceRef, { [date]: mergedAttendanceData });
          } else {
            // If the document doesn't exist, create a new document with the provided attendanceData
            await setDoc(attendanceRef, { [date]: [attendanceData] });
          }
      
          // console.log('Attendance record added/updated!');
        } catch (error) {
          console.error('Error adding attendance record: ', error);
        }
      };


    return {
        addAttendanceRecord,
        fetchAttendanceData,
        calculateAttendance,
        test
    }

}
