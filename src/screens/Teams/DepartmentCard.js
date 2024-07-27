import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import GroupedAvatars from './GroupedAvatar';


export default function DepartmentCard({item}) {
  return (
    <TouchableOpacity className='flex w-full h-[180px] p-4 bg-white rounded-3xl mb-4 justify-between bg-white'>
        
      <View>
      <Text className='font-semibold text-xl text-black mb-1'>Team*{item.name}</Text>
      <Text className='font-light text-sm text-black ml-1'>People({item.count})</Text>
      </View>
      <View className='flex-row w-full justify-between'>
      <GroupedAvatars/>
      <EvilIcons name="arrow-right" size={30} color="black" />
      </View>
    </TouchableOpacity>
  )
}