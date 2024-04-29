import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
 import { FIREBASE_AUTH } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import CustomButton from '../../components/CustomButton/CustomButton'

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
    <View>
      <CustomButton onPress={signOutUser} text='Sign Out'/>
    </View>
  )
}

export default Dashboard