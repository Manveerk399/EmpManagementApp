import { FlatList, StyleSheet, Text, View,TouchableOpacity, TextInputBase,Pressable } from 'react-native'
import React,{useState} from 'react'
import { useAuthContext } from '../../../../../context/AuthContext'
import useFetchCollection from '../../../../../firebase/useFetchCollection'
import { orderBy, where } from 'firebase/firestore'
import { TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { EvilIcons } from '@expo/vector-icons';

const BranchCard=({item,onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} className='flex-row w-full p-3 bg-white rounded-xl mb-4 items-center justify-between bg-white'>
          <Text className='font-semibold text-xl text-black mb-1'>{item.name}</Text>
          <EvilIcons name="arrow-right" size={30} color="black" />
        </TouchableOpacity>
      )
}

const EmployementType = ({navigation}) => {
    const {profile} = useAuthContext()

    const {data:emptypes,loading,error} = useFetchCollection('Employment Types',where('companyId','==',profile.companyId),orderBy('name'))

    const [searchText , SetSearchText] = useState('')
    const [filtered,setFiltered] = useState([])
    const[noMatch ,setNoMatch] = useState(false)
  

    // Filter employees based on the search query
    const searchList=()=>{
     const filteredtypes= emptypes?.filter(types =>
        types.name.toLowerCase().includes(searchText.toLowerCase())
      );
     
      setNoMatch(filteredtypes.length === 0)
  
      setFiltered(filteredtypes)
    }
  
    const onChange=(e)=>{
      if(e === ''){
        setFiltered([])
        setNoMatch(false)
      }
      SetSearchText(e)
    }
  
    const renderItem=({item})=>(
      <BranchCard item={item} onPress={()=>navigation.navigate('emptypeform',{data:item,action:'edit'})}/>
    )
  
  

   
   
  
    if (loading) {
  
      return <View className='flex-1 items-center justify-center'><ActivityIndicator animating={true} color={MD2Colors.blue400} size={40}/></View>
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
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
        data={filtered.length ===0 ? emptypes:filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
  />}
  <TouchableOpacity className='absolute right-4 bottom-10' onPress={()=>navigation.navigate('emptypeform')}>
        <View className='bg-blue-400 p-1.5 rounded-3xl w-28 flex-row justify-center items-center '>
          <Text className='text-white font-semibold text-2xl mr-2 bottom-0.5'>+</Text>
          <Text className='text-white font-semibold text-lg'>Add</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
}

export default EmployementType

const styles = StyleSheet.create({})