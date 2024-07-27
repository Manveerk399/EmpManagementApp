import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState}from 'react'
import { settings } from './settings'
import { set } from 'firebase/database'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

const LongCard=({item})=>{ 
  const [collapse,setCollapse]=useState(true)
  const navigate = useNavigation()
  return (
  
  <View className='gap-2'>
  <Pressable onPressIn={()=>setCollapse(!collapse)}>
    <View className='w-full p-3 bg-white rounded-2xl flex-row justify-between items-center'>
         {item.icon}
    <Text className='font-semibold'>{item.name}</Text>
   
   
     {collapse ? <AntDesign name="down" size={20} color="black" /> : <AntDesign name="up" size={20} color="black" />}
     
  </View>
  </Pressable>
  {!collapse &&
    <View className='p-1 bg-white-100 divide-slate-500 bg-neutral-200 items-center justify-center rounded-xl'>
     {item.tabs.map(tab  =>(<TouchableOpacity key={tab.name} onPress={()=>navigate.navigate(tab.link)}><Text className='font-semibold text-base p-2 text-center'>{tab.name}</Text></TouchableOpacity>))}
    </View>
}
  </View>
  )
}

const AdminPage = () => {

   const renderItem=({item})=>{

   return <LongCard item={item}/>
   }



  return (
     <View className='flex-1 p-4 bg-zinc-150'>
      <FlatList
        data={settings}
        contentContainerStyle={{gap:10}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default AdminPage

const styles = StyleSheet.create({})