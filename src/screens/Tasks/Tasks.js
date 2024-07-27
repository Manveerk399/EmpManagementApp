import { StyleSheet, Text, View,TouchableOpacity,FlatList } from 'react-native'
import React, { act, useEffect, useState } from 'react'
import { Agenda } from 'react-native-calendars'
import { activate } from 'firebase/remote-config'

const status=[
    {id:1,name:'All'},
    {id:2,name:'Pending'},
    {id:3,name:'In Progress'},
    {id:4,name:'Delayed'},
    {id:5,name:'Closed'},
    {id:6,name:'Completed'},
]

const all = {
    '2024-05-17':[{'id':1,'name':'task1','description':'testing',day:'17-05-2024'},{'id':2,'name':'task1','description':'testing','day':'2024-05-17'},{'id':3,'name':'task1','description':'testing','day':'2024-05-17'},{'id':4,'name':'task1','description':'testing','day':'2024-05-17'}],
    '2024-05-18':[{'id':1,'name':'task2','description':'testing',day:'17-05-2024'},{'id':2,'description':'testing','day':'2024-05-17'},{'id':3,'description':'testing','day':'2024-05-17'},{'id':4,'description':'testing','day':'2024-05-17'}],
    '2024-05-19':[{'id':1,'name':'task3','description':'testing',day:'19-05-2024'}],
    '2024-04-20':[{'id':1,'name':'task4','description':'testing',day:'20-05-2024'}],
    // {description:'08:30 AM',clockOut:'05:00 PM',date:'10 March 2024'},
      // {description:'08:30 AM',clockOut:'05:00 PM',date:'10 March 2024'},
      // {clockIn:'08:30 AM',clockOut:'05:00 PM',date:'10 March 2024'},
      // {clockIn:'08:30 AM',clockOut:'05:00 PM',date:'10 March 2024'},
      // {clockIn:'08:30 AM',clockOut:'05:00 PM',date:'10 March 2024'},
  }


const Progress={
    '2024-05-17':[{'id':1,'name':'task1','description':'testing',day:'17-05-2024'},{'id':2,'name':'task1','description':'testing','day':'2024-05-17'},{'id':3,'name':'task5','description':'testing','day':'2024-05-17'}],

}



const Tasks = () => {

    const [activeStatus,setActiveStatus] = useState(1)
    const [data,setData]=useState([])

  const renderItem=({item})=>{

    const bgColor = item.id === activeStatus ? 'gray' :''
    const isSelected=item.id === activeStatus


    return <TouchableOpacity style={[styles.statusButton,isSelected&&{backgroundColor:bgColor}]} onPress={()=>setActiveStatus(item.id)}>
        <Text style={styles.statusText}>{item.name}</Text>

    </TouchableOpacity>
  }

  const renderEmpty=()=>{
    return <></>
  }
  
  const renderDay=()=>{
    return null
  }


  const renderTasksItem = (item) => (
    <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
    </View>
  );

  useEffect(()=>{
    
    const list = activeStatus ===1 ? all
    :activeStatus === 2 ? Progress :[]

    setData(list)

  },[activeStatus])




  return (
    <View style={styles.container}>
    <View>
     <FlatList
     data={status}
     renderItem={renderItem}
     contentContainerStyle={styles.statusTabItem}
     horizontal
     style={styles.flatlist}
     showsHorizontalScrollIndicator={false}
     />
     </View>
     <Agenda
      items={data}
      renderItem={renderTasksItem}
      renderDay={renderDay}
    //   style={styles.agenda}
      showOnlySelectedDayItems
      showClosingKnob={true}
      renderEmptyDate={renderEmpty}
      renderEmptyData={renderEmpty}
      />
    </View>

  )
}

export default Tasks

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
        
       
    },
    flatlist:{
        padding:10,
        marginBottom:5
        // backgroundColor:'gray'

    },
    statusTabItem:{
        gap:10

    },

    statusButton:{
        borderColor:'black',
        padding:10,
        borderWidth:1,
        borderRadius:10,

    },
    itemContainer: {
        flex: 1,
        marginHorizontal:10
        
     
      },
})