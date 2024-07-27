import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Button ,ScrollView} from 'react-native'
 import { FIREBASE_AUTH } from '../../firebase/config'
import { signOut } from 'firebase/auth'
import CustomButton from '../../components/CustomButton/CustomButton'
import Welcome from './Welcome'
import Attendance from '../Attendance'
import CustomMenu from './Menu/CustomMenu'
import { useAuthContext } from '../../context/AuthContext'
import { ActivityIndicator } from 'react-native-paper'

const Dashboard = ({navigation}) => {

    const auth = FIREBASE_AUTH
    const {profile}=useAuthContext()

    const signOutUser=async()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
    });
}

if(!profile){
  return  <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
  <ActivityIndicator size="large" color="#0b99e6" />
  <Text className="mt-2 text-lg">Signing in...</Text>
</View>
}

  return (
    <ScrollView style={{flex:1,backgroundColor:'#f2f2f2'}} showsVerticalScrollIndicator={false}>
      <Welcome/>
      <Attendance/>
     <CustomMenu navigation={navigation}/>
     <CustomButton text='sign out' onPress={signOutUser}/>

    </ScrollView>
  )
}

export default Dashboard