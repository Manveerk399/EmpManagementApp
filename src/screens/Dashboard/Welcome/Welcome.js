import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeaderButton from '../../../components/Header/ScreenHeaderButton'
import { icons } from '../../../constants'

const Welcome = ({user}) => {
  return (
    <View style={styles.root}>
     <View style={styles.userContainer}>
      <ScreenHeaderButton Icon={icons.Person} color='white' size={45}/>
      <View style={styles.userDetails}>
        <Text style={styles.name}>Manveer kasseran</Text>
        <Text style={styles.role}>UX/UI Designer</Text>
      </View>
     </View>
   
    <ScreenHeaderButton Icon={icons.Notifcation} color='white' size={30}/>
  
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    root:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#3385ff',
        padding:10,
        alignItems:'center',
      
    },

    userContainer:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    userContainer:{
        flexDirection:'row',
        alignItems:'center'
        
    },

    name:{
        color:'white',
        fontWeight:'900'
    },

    role:{
        color:'white'
    },

    
 
})