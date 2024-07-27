import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps'
import Status from './Status'

const LeaveCard = ({leave}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subHeader}>Date</Text>
        <Status status={leave.status} id={leave.id}/>
      </View>
      <View>
        <Text style={styles.info}>{leave.firstDate} - {leave.lastDate}</Text>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.footer}>
       <View>
        <Text style={styles.subHeader}>Leave Type</Text>
        <Text>{leave.leaveType}</Text>
       </View>

       {leave?.actiontext &&<View>
        <Text style={styles.subHeader}>{leave.actiontext}</Text>
        <Text>{leave.by}</Text>
       </View>}



      </View>


    </View>
  )
}

export default LeaveCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:120,
        backgroundColor:'white',
        marginTop:10,
        borderRadius:5,
        padding:10,
        gap:2
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start'
    },

    status:{
        width:100,
        padding:3,
        backgroundColor:'#f0f0f5',
        borderRadius:5

    },

    pending:{
        color:'#ffbb33',
        textAlign:'center',
        fontSize:12
    },

    approved:{
        color:'#00cc44',
        textAlign:'center',
        fontSize:12
    },

    subHeader:{
        color:'gray',
        
    },

    info:{
        fontSize:12,
        
    },

    divider:{
        marginTop:10,
        marginBottom:10,
        height:1,
        backgroundColor:'black',

    },

    footer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        

    }
})