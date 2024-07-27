import { StyleSheet, Text, View,TouchableOpacity,Modal, Settings, Pressable } from 'react-native'
import React,{useState,useEffect, useRef, useMemo} from 'react'
import { Agenda,AgendaEntry,Calendar} from 'react-native-calendars'
import AttendanceCard from '../Attendance/components/AttendanceCard'
import { useFetchShifts } from './useFetchShifts'
import ActionSheet from 'react-native-actionsheet'
import { getCurrentDate } from '../../utility/getDate'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from 'expo-router'
import { Feather } from '@expo/vector-icons';

const demoList = {
    '2024-05-17':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'17-05-2024'},{'id':2,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':3,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':4,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'}],
    '2024-05-18':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'17-05-2024'},{'id':2,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':3,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':4,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'}],
    '2024-05-19':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'19-05-2024'}],
    '2024-05-20':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'20-05-2024'}],
    '2024-05-21':[],
        
  }

// export const  ShiftSetting=()=>{
//   const navigation = useNavigation()

//   return <Pressable className='mr-4' onPress={()=> navigation.navigate("shiftconfigs")}>
//     <Feather name="settings" size={24} color="black" />
//   </Pressable>

// }


const ShiftCard = ({item,handleLongPress}) => {

  
    
   return <TouchableOpacity style={styles.itemContainer} onLongPress={handleLongPress}>
      <View className='flex-1 flex-row justify-between p-5 bg-white mt-5 rounded-xl'>
        <View>
        <Text>{item.shiftname?.label}</Text>
        <Text className='font-light mt-2'>{item.time}</Text>
        </View>
        <View className='p-4 rounded-full bg-green-300'>
          <Text>YK</Text>
        </View>
      </View>
    </TouchableOpacity>
  
}

const Shifts = ({navigation}) => {
  

  const {yyyy_mm_dd} = getCurrentDate()

   const [date,setDate] = useState(yyyy_mm_dd)
   
   const {data,loading} = useFetchShifts(date)
   
   const actionSheetRef = useRef();

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  console.log('shifts data',data)

   const renderItem=(item)=>{
    return <ShiftCard item={item} handleLongPress={showActionSheet}/>
   }

    const renderEmpty=()=>{
        return <></>
      }
      
      const renderDay=()=>{
        return null
      }

      const getMarkedDates = () => {
        let markedDates = {};
    
        Object.keys(data).forEach(date => {
          if (data[date].length > 0) {
            markedDates[date] = { selected: true, marked: true, selectedColor: 'blue' };
          }
        });

        console.log(markedDates)
    
        
    
        return markedDates;
      };

      const handlePress = (index) => {
        switch (index) {
          case 0:
            navigation.navigate('AssignShift',{action:'change'})
            break;
          case 1:
            navigation.navigate('AssignShift',{action:'delete'})
            break;
          case 2:
            console.log('Option 3 pressed');
            break;
          default:
            break;
        }
      };


      const handleDayPress = async (day) => {
          console.log('press')
        
          setDate(day.dateString);
          
       
      };


      console.log('loading shifts',loading)

      // useEffect(()=>{
      //   const {yyyy_mm_dd} = getCurrentDate()
      //   setDate(yyyy_mm_dd)
      // },[])
     

    
     if(loading){
      return (
        <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
          <ActivityIndicator size="large" color="#0b99e6" />
          <Text className="mt-2 text-lg">Loading...</Text>
        </View>
      )
     }

      
  
    return (
        <View style={styles.container}>
               {/* <Calendar
                markedDates={getMarkedDates()}
        
        // markedDates={{
        //   [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
        // }}
      /> */}
          <Agenda
          items={data}
          renderItem={renderItem}
          //renderDay={renderDay}
          selected={date}
          style={styles.agenda}
          onDayPress={handleDayPress}
          //showOnlySelectedDayItems
          showClosingKnob={true}
          renderEmptyDate={renderEmpty}
          
          
        //   renderEmptyData={renderEmpty}
          />
        <TouchableOpacity onPress={()=>navigation.navigate('AssignShift')}  className='p-3 bg-sky-200 absolute rounded-full bottom-20 right-5'>
             <Text className='font-semibold'>Assign Shifts</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.navigate('shiftconfigs')}  className='p-3 bg-sky-200 absolute rounded-full bottom-6 right-5'>
             <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>

      
      
     
      <ActionSheet
        ref={actionSheetRef}
        title={'Choose an option'}
        options={['Change Shift', 'Delete Shift','Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) => handlePress(index)}
      />
        </View>
      )
  
}

export default Shifts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#fff',
        position:'relative'
      },
      itemContainer: {
        flex: 1,
        marginHorizontal:10,
      
     
      },
    

    
     
     
})