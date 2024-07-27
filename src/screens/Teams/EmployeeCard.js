import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomAvatar from '../../components/CustomAvatar/CustomAvatar'
import profile from '../../assets/logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { abbreviateFullName } from '../Dashboard/Welcome/Welcome';
import ScreenHeaderButton from '../../components/Header/ScreenHeaderButton';
import { TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
const EmployeeCard = ({info,onLongPress}) => {
  return (
    <TouchableOpacity className='flex-row items-start p-3 bg-white rounded-2xl' onPress={()=>onLongPress(info)}>
        <ScreenHeaderButton textOnly={true} text={abbreviateFullName(info?.fullname)} color='white' size={45}/>
        <View className='flex-1 w-full ml-5'>
            <Text className='font-bold'>{info.fullname}</Text>
            <Text className='font-medium text-slate-400 mb-2'>{info.specificrole?.label}</Text>
            
            <View  className="flex-row items-center mb-1">
            <MaterialCommunityIcons name="email-outline" size={16} color="gray" />
            <Text className='font-medium ml-1'>{info.email}</Text>
            </View>
            <View className="flex-row items-center mb-1">
            <Feather name="phone" size={16} color="gray" />
            <Text  className='font-medium ml-1'>{info.workphonenum}</Text>
            </View>
            <View  className="flex-row items-center mb-1">
            <FontAwesome6 name="file-contract" size={16} color="gray" />
              <Text  className='font-medium ml-2'>{info?.emptype?.label}</Text>
              
            </View>
            {info?.empstatus && <View  className="self-end items-center mb-1 rounded-2xl" style={styles[info?.empstatus?.label]}>
           
              <Text  className='font-medium font-bold p-2 text-white'>{info?.empstatus?.label}</Text>
              
            </View>}
        </View>
     
    </TouchableOpacity>
  )
}

export default EmployeeCard

const styles = StyleSheet.create({

  Active:{
    backgroundColor:'#66ff66',
   
  },
  text:{
    color:'white'
  },
  Resigned:{
    backgroundColor:'#ff5c33'
  },
  Terminated:{
    backgroundColor:'#e0e0eb'
  },
  Probation:{
    backgroundColor:'#ffb366'
  },
})