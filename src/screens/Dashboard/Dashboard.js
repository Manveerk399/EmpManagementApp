import { View, Text } from 'react-native'
import React from 'react'
import { Button ,ScrollView} from 'react-native'
 import { FIREBASE_AUTH } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import CustomButton from '../../components/CustomButton/CustomButton'
import Welcome from './Welcome'
import Attendance from '../Attendance'
import CustomMenu from './Menu/CustomMenu'

const Dashboard = ({navigation}) => {

    const auth = FIREBASE_AUTH

    const signOutUser=async()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
    });
}

  return (
    <ScrollView style={{flex:1,backgroundColor:'#f2f2f2'}} showsVerticalScrollIndicator={false}>
      <Welcome/>
      <Attendance/>
     <CustomMenu/>

    </ScrollView>
  )
}

export default Dashboard