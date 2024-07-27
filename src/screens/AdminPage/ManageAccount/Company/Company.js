import { View, Text,FlatList, Pressable,StyleSheet } from 'react-native'
import React from 'react'
import { pages } from './pages'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';


export const PageComp=({item})=>{
  const navigate=useNavigation()

  return <Pressable className='p-5 bg-neutral-50 flex-row items-center justify-between' onPress={()=>navigate.navigate(item.link)}>
    <View className='gap-2 flex-1'>
    <Text className='text-base font-semibold'>{item.name}</Text>
    <Text className='text-xs font-light'>{item.description}</Text>
    </View>
    <View className='ml-2'><AntDesign name="right" size={24} color="black"/></View>
  </Pressable>
}

const Company = () => {

  const renderItem=({item})=>{
    return <PageComp item={item}/>
    }
  return (
    <View>
      <FlatList
        data={pages}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=>
          <View style={styles.separator}></View>
        }
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

export default Company


const styles = StyleSheet.create({
  container:{
    
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc', // Color of the separator
  },
})