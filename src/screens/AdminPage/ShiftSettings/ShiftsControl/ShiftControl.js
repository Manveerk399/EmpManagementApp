import { StyleSheet, Text, TouchableOpacity, View ,FlatList } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import useFetchCollection from '../../../../firebase/useFetchCollection';
import { where } from 'firebase/firestore';
import { useAuthContext } from '../../../../context/AuthContext';


export const EditIcon=({onPress})=>{

  return <TouchableOpacity onPress={onPress}>
    <Feather name="settings" size={20} color="black" />
</TouchableOpacity>
}

const shift=[
  {
    id:1,
    name:'General',
    time:'10:00 AM - 05:00 PM',
  },
  {
    id:2,
    name:'General',
    time:'10:00 AM - 05:00 PM',
  },
  {
    id:3,
    name:'General',
    time:'10:00 AM - 05:00 PM',
  },
  {
    id:4,
    name:'General',
    time:'10:00 AM - 05:00 PM',
  },
]

const ShiftCard=({item,navigation})=>{
  return <TouchableOpacity onPress={()=>navigation.navigate('shiftform',{data:item,action:'edit'})}  className='flex-row justify-between items-center p-3 bg-white rounded-xl'>
    <View className='bg-sky-100 p-3 rounded-xl'>
      <Text>{item.name}</Text>
      </View>
    <Text>{item.from} - {item.to}</Text>
    <EditIcon onPress={()=>navigation.navigate('shiftSettingsform',{data:item,action:'edit'})}/>
  </TouchableOpacity>
}



const ShiftControl = ({navigation}) => {

  const {profile}=useAuthContext()

  // console.log(profile)
  const {data:shifts} = useFetchCollection('shifts',where('companyId','==',profile.companyId))


  // console.log(shifts)
  const renderItem=({item})=>{
    return <ShiftCard item={item} navigation={navigation}/>
  }
  return (
    <View className='flex-1 relative p-2'>
      <View className='p-2 mb-2'>
        <Text className='text-gray-400'>Click on the settings icon to define how you want to determine the attendance for each shift.</Text>
      </View>
      <FlatList
       data={shifts}
       contentContainerStyle={styles.container}
       renderItem={renderItem}
       keyExtractor={item => item.id}



/>


      <TouchableOpacity onPress={()=>navigation.navigate('shiftform')} className='p-2 bg-sky-200 absolute rounded-full bottom-20 right-5'>
      <Entypo name="plus" size={26} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default ShiftControl

const styles = StyleSheet.create({
  container:{
    gap:15
  }
})