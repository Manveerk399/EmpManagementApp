import { StyleSheet, Text, View,FlatList, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import AttendanceCard from './components/AttendanceCard'
import { Agenda,AgendaEntry} from 'react-native-calendars'
import { useAttendance } from './useAttendance'
import { getCurrentDate } from '../../utility/getDate'
import { useAuthContext } from '../../context/AuthContext'

const demoList = {
  '2024-05-17':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'17-05-2024'},{'id':2,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':3,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':4,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'}],
  '2024-05-18':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'17-05-2024'},{'id':2,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':3,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'},{'id':4,'clockIn':'08:30 AM','clockOut':'05:00 PM','day':'2024-05-17'}],
  '2024-05-19':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'19-05-2024'}],
  '2024-04-20':[{'id':1,'height':50,'clockIn':'08:30 AM','clockOut':'05:00 PM',day:'20-05-2024'}],
      
}

const renderItem = (item) => (
  <View style={styles.itemContainer}>
    <AttendanceCard item={item} clockIn={item.clockIn} clockOut={item.clockOut} date={item.day} />
  </View>
);

const AttendanceList=()=>{
  
  const {fetchAttendanceData} = useAttendance()
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceForSelectedDate, setAttendanceForSelectedDate] = useState({});
  const {profile} = useAuthContext()
     
const renderEmpty=()=>{
  return <></>
}

const renderDay=()=>{
  return null
}

const handleDayPress = async (day) => {
  // console.log(day)
  try {
    setSelectedDate(day.dateString);
    const data = await fetchAttendanceData(day.dateString,profile.companyId);
    // Update attendance data for the selected date
    setAttendanceForSelectedDate({[day.dateString]:data});
  } catch (error) {
    console.error('Error fetching attendance data: ', error);
  }
};

const fetchInitialData=async()=>{
  try {
    const {yyyy_mm_dd} = getCurrentDate()
    const data = await fetchAttendanceData(yyyy_mm_dd,profile.companyId);
    // Update attendance data for the selected date
    setAttendanceForSelectedDate({[yyyy_mm_dd]:data});
  } catch (error) {
    console.error('Error fetching attendance data: ', error);
  }
}




useEffect(() => {
  // Fetch attendance data for the current date when the component mounts
    
  fetchInitialData()

}, []); // Empty dependency array to run the effect only once on mount

  return (
    <View  style={styles.container}>
      <Agenda
      items={attendanceForSelectedDate}
      renderItem={renderItem}
      renderDay={renderDay}
      onDayPress={handleDayPress}
      selected={selectedDate}
      style={styles.agenda}
      showOnlySelectedDayItems
      showClosingKnob={true}
      renderEmptyDate={renderEmpty}
      renderEmptyData={renderEmpty}
      />
    </View>
  )

}

export default AttendanceList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor: '#fff',
      },
      itemContainer: {
        flex: 1,
        marginHorizontal:10
        
     
      },
    

    
     
     
})