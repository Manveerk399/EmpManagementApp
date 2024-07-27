import { View, Text,Image, Alert } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useAuthContext } from '../../context/AuthContext';
import { abbreviateFullName } from '../../screens/Dashboard/Welcome/Welcome';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/config';

const CustomDrawerContent = (props) => {
  
  const navigation = useNavigation()

  const {profile} = useAuthContext()

  const signOutUser=async()=>{
    signOut(FIREBASE_AUTH).then(() => {
      // Sign-out successful.
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
    });
}


  const showSignOutConfirmation = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>signOutUser() }
      ]
    );
  };
  
  return (
    <View className='flex-1'>

    
    <DrawerContentScrollView 
    {...props} 
    scrollEnabled={false}
    contentContainerStyle={{
        backgroundColor:'#3385ff',
    }
    }
    
    >

    <View className='p-5'>
        <View className='self-center p-6 bg-neutral-300 rounded-full'>
          <Text className='text-2xl font-bold'> {abbreviateFullName(profile?.fullname)}</Text>
        </View>
        <Text className='text-bold pt-3 text-white text-lg self-center'>
           {profile?.fullname}
        </Text>

    </View>
    <View className='pt-3 bg-white'>
      <DrawerItemList {...props}/> 
      <DrawerItem 
      label={'Sign Out'} 
      labelStyle={{
        marginLeft:-20
      }}
      icon={({size,color})=><FontAwesome name="sign-out" size={size} color={color}/>} 
      onPress={showSignOutConfirmation}/>
      </View>
     
    </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawerContent