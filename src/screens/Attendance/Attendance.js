import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ScreenHeaderButton from '../../components/Header/ScreenHeaderButton'
import icons from '../../constants/icons'
import { getDate, getTime } from '../../utility/getDate'
import { Chip,useTheme } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { set } from 'react-hook-form'
import { shadowstyles } from '../../components/MenuCard/MenuCard'

const Attendance = () => {

    let currenttime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [clockIn,setClockIn] = useState(null)
    const [clockOut,setClockOut] = useState(null)

   

    const [time ,setTime] = useState(currenttime)
    
    const today=getDate()

    const updateTime=()=>{
        let currenttime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTime(currenttime)


    }

    setInterval(updateTime,1000)
   

    const handleClockIn=()=>{
        console.log('clocking in')
        setClockIn(time)
    }

    const handleClockOut=()=>{
        console.log('clocking out')
        setClockOut(time)
    }


    console.log('time',clockIn,clockOut)



  return (
    <View style={[styles.root,shadowstyles.shadowStyle]}>
    <View style={styles.header}>
      <View style={[styles.date,,{position:'relative',right:7}]}>
      <ScreenHeaderButton Icon={icons.Calendar} size={16} color='#3385ff'/>
      <Text style={styles.text}>{today}</Text>
      </View>
      <View style={[styles.date,{position:'relative',right:10}]}>
      <ScreenHeaderButton Icon={icons.Clock} size={16} color='#3385ff'/>
      <Text  style={styles.text}>{time}</Text>
      </View>
      </View>
      <View style={styles.time}>
        <Text  style={styles.timeText}>{clockIn || time}</Text>
        <Text style={styles.timeText}>{clockOut || time}</Text>

      </View>

      <View style={styles.footer}>
      <Chip 
      disabled={clockIn ? true :false}
      style={[styles.chip,{backgroundColor:clockIn ? 'gray':'#3385ff'}]} 
      textStyle={[styles.chipText]} 
      icon={()=> <MaterialCommunityIcons name="login" size={16} color="white" />
    } 
    onPress={() => handleClockIn()}>
        Check In
        </Chip>
      <Chip style={[styles.chip,{backgroundColor:clockOut ? 'gray':'red'}]} disabled={clockOut ? true :false} textStyle={styles.chipText}  icon={()=><MaterialCommunityIcons name="logout" size={16} color="white" />
    }  onPress={() => handleClockOut()}>Check Out</Chip>
      </View>
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