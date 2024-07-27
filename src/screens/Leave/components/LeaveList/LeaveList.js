import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import LeaveCard from '../LeaveCard.js/LeaveCard'
import { list } from 'firebase/storage'

const leaveRequests=[
    { id: '1', title: 'Leave Request 1' },
    { id: '2', title: 'Leave Request 2' },
    { id: '3', title: 'Leave Request 1' },
    { id: '4', title: 'Leave Request 2' },
    { id: '5', title: 'Leave Request 1' },
    { id: '6', title: 'Leave Request 2' },
    { id: '7', title: 'Leave Request 1' },
    { id: '8', title: 'Leave Request 2' },
]

const LeaveList = ({leaves}) => {


    const renderRequestItem = ({ item }) => (
         <LeaveCard/>
      );
  return (
    <View style={styles.container}>
      {leaves.map(leave=>
        <LeaveCard leave={leave}/>
      )}
    </View>
  )
}

export default LeaveList

const styles = StyleSheet.create({
   container:{
    padding:10,
    flex:1,
    
   },

})