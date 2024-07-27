import { FlatList, StyleSheet, Text, View,TouchableOpacity, TextInputBase,Pressable } from 'react-native'
import React, { useState } from 'react'
import DepartmentCard from './DepartmentCard'
import { useAuthContext } from '../../../../../context/AuthContext'
import { orderBy, where } from 'firebase/firestore'
import useFetchCollection from '../../../../../firebase/useFetchCollection'
import { TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const data =[
  {id:1,name:'Developer',count:5},
  {id:2,name:'Marketing',count:5},
  {id:3,name:'HR',count:5},
  {id:4,name:'Design',count:5},
]


const Department = ({navigation}) => {
  const {profile} = useAuthContext()
  
  
  const {data:departments,loading,error} = useFetchCollection('departments',where('companyId','==',profile.companyId))

  const [searchText , SetSearchText] = useState('')
  const [filtered,setFiltered] = useState([])
  const[noMatch ,setNoMatch] = useState(false)


  

  

  

  // Filter employees based on the search query
  const searchList=()=>{
   const filteredDept= departments?.filter(dept =>
      dept.name.toLowerCase().includes(searchText.toLowerCase())
    );
   
    setNoMatch(filteredDept.length === 0)

    setFiltered(filteredDept)
  }

  const onChange=(e)=>{
    if(e === ''){
      setFiltered([])
      setNoMatch(false)
    }
    SetSearchText(e)
  }

  const renderItem=({item})=>(
    <DepartmentCard item={item} onPress={()=>navigation.navigate('users',{deptfilter:item.id})} onPressEdit ={()=>navigation.navigate('departmentform',{data:item,action:'edit'})}/>
  )



  console.log(departments,filtered)

  if (loading) {

    return <View className='flex-1 items-center justify-center'><ActivityIndicator animating={true} color={MD2Colors.blue400} size={40}/></View>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View className='flex-1 p-4 bg-zinc-100 relative'>
      <View className='flex-row items-center justify-end mr-2 mb-2 gap-2'>
        <View className='flex-1 bg-white rounded-3xl justify-center p-3'>
          <TextInput placeholder='search' placeholderTextColor='gray' onChangeText={onChange} value={searchText}/>
        </View>
      <Pressable onPress={searchList}>
      <FontAwesome name="search" size={16} color="gray" />
      </Pressable>

      </View>
      {
      noMatch ? <View className='flex-1 items-center jusrify-center mt-5'>

        <Text className='font-bold text-gray'>No Match Found</Text>
      </View>
      :
      <FlatList
      data={filtered.length ===0 ? departments:filtered}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
/>}
<TouchableOpacity className='absolute right-4 bottom-10' onPress={()=>navigation.navigate('departmentform')}>
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