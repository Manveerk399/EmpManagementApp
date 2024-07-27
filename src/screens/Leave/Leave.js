import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { getCurrentDateFormatted } from '../../utility/getDate'
import { ScrollView } from 'react-native-gesture-handler'
import LeaveList from './components/LeaveList/LeaveList'
import StatusBar from './components/StatusBar/StatusBar'
import { useAuthContext } from '../../context/AuthContext'
import { useLeaveAction } from './useLeaveActions'
import { set } from 'react-hook-form'

const Leave = ({navigation}) => {

   const {profile} = useAuthContext()
   const currentdate = getCurrentDateFormatted()
   const [data,setData] = useState([])

   const {fetchLeaveData} = useLeaveAction()

  //  console.log('leaves',data)

   const fetchData=async()=>{
    const data = await fetchLeaveData(profile.uid)
    setData(data)
   }
   

   useEffect(()=>{

    fetchData()

   },[])




  return (
    <View style={styles.container}>
    <ScrollView style ={styles.container}  stickyHeaderIndices={[3]}>
    
      <View style={styles.balance}>
      <Text style={styles.text}>Leave Balances as at {currentdate} </Text>
      </View>
      <View style={[styles.balance,styles.WHITEBG]}>
      <Text style={styles.text}>Annual Leave</Text>
      <Text style={styles.text}>{profile.annualleave} hr</Text>
      </View>
      <View style={[styles.balance,styles.WHITEBG]}>
      <Text style={styles.text}>Sick Leave  </Text>
      <Text style={styles.text}>{profile.sickleave} days</Text>
      </View >
      <View style={styles.leaveRequestContainer}>
      <View style={styles.balance}>
      <Text style={styles.title}>Leave Requests</Text>
      </View>
      <StatusBar/>
      
      </View>
      <LeaveList leaves={data}/>
    
     
        

    </ScrollView>
    <View style={styles.addButton}>
      <Button icon='plus' mode='contained-tonal' buttonColor='#3399ff' textColor='white' onPress={()=>navigation.navigate('LeaveForm')}>
         Leave Requests
        </Button>
      </View> 
    </View>
  )
}

export default Leave

const styles = StyleSheet.create({
    container:{
        flex:1,
        
        
    },

    balance:{
        height:50,
       justifyContent:'space-between',
       paddingHorizontal:20,
       marginBottom:10,
       flexDirection:'row',
       alignItems:'center'

       

    },
    text:{
        fontSize:16
    },

    WHITEBG:{
        backgroundColor:'#f5f5f0'
    },

    title:{
        fontSize:15
    },

    addButton:{
        position:'absolute',
        bottom:100,
        right:10
    },

    leaveRequestContainer:{
        flex:1,
        backgroundColor:'white',
        borderBottomColor:'gray',
       borderBottomWidth:0.5
    }

   
    
   
   
    
})