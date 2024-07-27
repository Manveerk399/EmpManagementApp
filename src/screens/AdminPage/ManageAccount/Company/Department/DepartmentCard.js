import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import GroupedAvatars from '../../../../Teams/GroupedAvatar';
import { Feather } from '@expo/vector-icons';

export default function DepartmentCard({item,onPress,onPressEdit}) {
  return (
    <View  className='flex w-full h-[180px] p-4 bg-white rounded-3xl mb-4 justify-between bg-white'>
      
      <View>
        <View className='flex-row items-center justify-between'>
      <Text className='font-semibold text-xl text-black mb-1'>{item.name}</Text>
      <Pressable onPress={onPressEdit}>
      <Feather name="edit-2" size={16} color="black" />
      </Pressable>
      </View>
      <Text className='font-light text-sm text-black ml-1'>People({item.count})</Text>
      </View>
      <View className='flex-row w-full justify-between'>
      <View>
      <Text className='text-zinc-400 font-bold'>Lead by</Text>
      <Text>{item.leader.label}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
      <EvilIcons name="arrow-right" size={30} color="black" />
      </TouchableOpacity>
      </View>
    </View>
  )
}