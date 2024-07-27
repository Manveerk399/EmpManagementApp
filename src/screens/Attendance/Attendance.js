import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { getDate, getTime } from '../../utility/getDate'
import { useAttendance } from './useAttendance'
import { useAuthContext } from '../../context/AuthContext'
import { getCurrentDate } from '../../utility/getDate'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { calculateTimeDifference } from '../../utility/getDate'
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'

const Attendance = () => {

    const {addAttendanceRecord,calculateAttendance,test} = useAttendance()
    const {profile,shift} = useAuthContext()
    let currenttime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [clockIn,setClockIn] = useState(null)
    const [clockOut,setClockOut] = useState(null)

    

   
    const [time ,setTime] = useState(currenttime)
    
    const today=getDate()

    const updateTime=()=>{
        let currenttime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        setTime(currenttime)


    }

    setInterval(updateTime,1000)
   

    const handleClockIn=async()=>{
        // console.log('clocking in')
        const { yyyy_mm_dd, dd_mm_yyyy } = getCurrentDate();
        const data = {
            clockIn: '7:15 PM',
            status: 'clocked in',
            name: profile.fullname,
            uid: profile.uid,
            day: dd_mm_yyyy,
            companyId: profile.companyId,
            shift:shift.shiftname.value
        };
    
        try {
            await setDoc(doc(db, 'attendance', profile.companyId, yyyy_mm_dd, profile.uid), data);
            setClockIn(time);
        } catch (error) {
            console.error("Error clocking in: ", error);
        }
       

    }




const handleClockOut=async()=>{
        // const shift = {
        //     from: '09:00 AM',
        //     to: '06:00 PM',
        //     before: '1:00', // 1 hour before
        //     after: '0:00'   // 0 hours after
        //   };
          
        //   const attendanceSettingsStrict = {
        //     allowMaxHours: false,
        //     allowOvertimeDeviation: true,
        //     lenient: false,
        //     lenientHours: '08:00 hours',
        //     lenientMode: '',
        //     maxHours: '00:00 hours',
        //     strict: true,
        //     strictMode: 'manual',
        //     strictFullDay: '08:00 hours',
        //     strictHalfDay: '04:00 hours'
        //   };
          
        //   const attendanceSettingsLenient = {
        //     allowMaxHours: true,
        //     allowOvertimeDeviation: true,
        //     lenient: true,
        //     lenientHours: '08:00 hours',
        //     lenientMode: 'manual',
        //     maxHours: '08:00 hours',
        //     strict: false,
        //     strictMode: '',
        //     strictFullDay: '08:00 hours',
        //     strictHalfDay: '04:00 hours'
        //   };



    const { yyyy_mm_dd, dd_mm_yyyy } = getCurrentDate();

    const{
            attendanceStatus,
            workedHours,
            payableHours,
            overtime,
            deviation
        } = (calculateAttendance(clockIn,'8:30 PM'));

    const data = {
        clockOut: '8:30 PM',
        status:attendanceStatus, 
        workedHours,
        payableHours,
        overtime,
        deviation,
       
    };

   
    try {
        await setDoc(doc(db, 'attendance', profile.companyId, yyyy_mm_dd, profile.uid), data);
        setClockOut(time);
    } catch (error) {
        console.error("Error clocking in: ", error);
    }
    }



  return (

    <View className='flex-1 bg-white m-5 rounded-lg p-4 shadow-sm drop-shadow-2xl'> 
    <View className='flex-row justify-center items-center justify-between'>
    <Text className='text-base font-medium'>Attendance</Text>
    <Text className='text-sm text-gray-500 font-medium'>{today}</Text>
    <Text className='text-base font-medium'>{time}</Text>
    </View>
    {shift ? <View>
    {!clockIn &&<View className='justify-center items-start p-2'>
        {/* <Ionicons name="sunny" size={24} color="#ebcc34"/> */}
         <Text className='font-light ml-1 text-sm'>Hello {profile?.fullname},You have a {shift?.shiftname.label} ({shift?.shiftname.value.from} - {shift?.shiftname.value.to})</Text>
         <Text>Please do not forget to check in and out.</Text>
    </View>}
    {!clockIn && <Pressable onPress={handleClockIn}>
        <View className='w-full justify-center flex-row items-center bg-blue-500 p-2 rounded-xl mt-2'>
            <Feather name="clock" size={15} color="white" />
            <Text className='text-white ml-1'>Check in / Out</Text>

        </View>
    </Pressable>}

    {clockIn && !clockOut && <Pressable onPress={handleClockOut}>
        <View className='w-full justify-center flex-row items-center bg-red-500 p-2 rounded-xl mt-2'>
            <Feather name="clock" size={15} color="white" />
            <Text className='text-white ml-1'>Check in / Out</Text>

        </View>
    </Pressable>}

    {/* <Pressable onPress={testing}>
        <View className='w-full justify-center flex-row items-center bg-red-500 p-2 rounded-xl mt-2'>
            <Feather name="clock" size={15} color="white" />
            <Text className='text-white ml-1'>Test</Text>

        </View>
    </Pressable> */}

    {
        clockIn && clockOut && <Text className='my-3'>You have completed {calculateTimeDifference(clockIn,clockOut)} hours.</Text>
    }

    <View className='mt-2 '>
    <View className='flex-row items-center'>
    <MaterialIcons name="login" size={20} color="#1d83f0" />
    <Text className='ml-3'>{clockIn}</Text>

    </View>
    <View className='h-[1px] bg-gray-300 w-full my-2'></View>
    <View className='flex-row items-center'>
    <MaterialIcons name="logout" size={19} color="red" />
    <Text className='ml-3'>{clockOut}</Text>

    </View>

    </View>

    </View>
    :
    <View className='justify-center items-start p-2'>
        {/* <Ionicons name="sunny" size={24} color="#ebcc34"/> */}
         <Text className='font-light ml-1 text-sm'>Hello {profile?.fullname},You have no shift assigned today.</Text>
         <Text>Please contact your reporting manager for any questions.</Text>
    </View>
    
    
    }


    </View>
  )
}

export default Attendance

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'white',
        margin:10,
        height:180,
        borderRadius:20,
        

    },

    header:{
         width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',

    },

    date:{
        alignItems:'center',
        flexDirection:'row',
    },

    text:{
        marginLeft:-12,
        color:'#3385ff'

    },

    footer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:30
        
        
    },

    chip:{
        width:120,
        height:35,
        alignItems:'center'
    },

    chipText:{
        color:'white'
    },
    
    time:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        gap:10
       
        
    },

    timeText:{
        fontSize:20,
        fontWeight:'bold'
    }
   
})