import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuCard from '../../../components/MenuCard/MenuCard'
import { shadowstyles } from '../../../components/MenuCard/MenuCard'
import icons from '../../../constants/icons'


const CustomMenu = () => {
  return (
    <View style={styles.root}>
    <Text style={styles.title}>Overview</Text>
    <View style={[styles.grid,shadowstyles.shadowStyle]}>
        <MenuCard title='Leaves' backgroundColor='#ffbb33'/>
        <MenuCard title='Attendance' backgroundColor='#1a75ff'/>
        <MenuCard title='Pay Slip' backgroundColor='#47d147'/>
        <MenuCard title='Tasks'backgroundColor='#aa80ff'/>
        <MenuCard title='Support' backgroundColor='#ff9966'/>
        <MenuCard title='Teams' backgroundColor='#33ccff'/>    
    </View>
    </View>
  )
}

export default CustomMenu

const styles = StyleSheet.create({
    root:{
 flex:1,
 padding:20
    },

    title:{
    marginBottom:10,
    fontSize:18,
    fontWeight:'bold'

    },

    grid:{
        flex:1,
        
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap',
        gap:10

    }
})