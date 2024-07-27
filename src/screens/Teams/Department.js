import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import DepartmentCard from './DepartmentCard'


const data =[
  {id:1,name:'Developer',count:5},
  {id:2,name:'Marketing',count:5},
  {id:3,name:'HR',count:5},
  {id:4,name:'Design',count:5},
]

const Department = () => {


  const renderItem=({item})=>(
    <DepartmentCard item={item}/>
  )
  return (
    <View className="flex-1 p-4 bg-zinc-100">
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
/>
<TouchableOpacity className='absolute right-4 bottom-10' onPress={()=>navigation.navigate('CreateEmp')}>
      <View className='bg-blue-400 p-1.5 rounded-3xl w-28 flex-row justify-center items-center '>
        <Text className='text-white font-semibold text-2xl mr-2 bottom-0.5'>+</Text>
        <Text className='text-white font-semibold text-lg'>Add</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default Department

const styles = StyleSheet.create({})