import { StyleSheet, Text, View,Platform } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Icons={
    Leave:<MaterialCommunityIcons name="calendar-refresh-outline" size={24} color='white' />
}


const MenuCard = ({title ,backgroundColor}) => {
    return (
      <View style={[styles.card,shadowstyles.shadowStyle]}>
        <View style={[styles.iconContainer,{backgroundColor:backgroundColor}]}>
        {title==='Leaves' && <MaterialCommunityIcons name="calendar-refresh-outline" size={24} color='white' />}
        {title==='Attendance' && <MaterialCommunityIcons name="calendar-month-outline" size={24} color='white' />}
        {title==='Pay Slip' && <FontAwesome5 name="file-invoice-dollar" size={24} color="white" />}
        {title==='Tasks' && <FontAwesome5 name="tasks" size={24} color="white" />}
        {title==='Teams' && <AntDesign name="team" size={24} color="white" />}
        {title==='Support' && <MaterialIcons name="contact-support" size={24} color="white" />}
        </View>
        <Text>{title}</Text>
      </View>
    )
  }

export default MenuCard

const styles = StyleSheet.create({
    card:{
        minHeight:90,
        minWidth:90,
        backgroundColor:'white',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        elevation:5
    

    },

    iconContainer:{
        height:50,
        width:50,
        borderRadius:'50%',
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    }

})




export const shadowstyles = StyleSheet.create({
    shadowStyle: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      }),
    },
  });