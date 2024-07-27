import { FlatList, StyleSheet, Text, View,TouchableOpacity, TextInputBase,Pressable } from 'react-native'
import React,{useState} from 'react'
import { useAuthContext } from '../../../../../context/AuthContext'
import useFetchCollection from '../../../../../firebase/useFetchCollection'
import { orderBy, where } from 'firebase/firestore'
import { TextInput } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const BranchCard=({item,onPress})=>{
    return (
        <TouchableOpacity onPress={onPress} className='flex w-full h-[180px] p-4 bg-white rounded-3xl mb-4 justify-between bg-white'>
          <View>
          <Text className='font-semibold text-xl text-black mb-1'>{item.name}</Text>
          {/* <Text className='font-light text-sm text-black ml-1'>Address:</Text> */}
          <Text className='font-light text-sm text-black ml-1'>{item.address1},{item.address2}</Text>
          <Text className='font-light text-sm text-black ml-1'>{item.country},{item.city}</Text>
          <Text className='font-light text-sm text-black ml-1'>{item.postalcode}</Text>
          </View>
          <View className='flex-row w-full justify-between'>
          <View>
          <Text className='text-zinc-400 font-bold'>Admin</Text>
          <Text>{item.admin.label}</Text>
          </View>
          <View>
          <Text className='text-zinc-400 font-bold'>Contact No.</Text>
          <Text>{item.contactno}</Text>
          </View>
          </View>
        </TouchableOpacity>
      )
}

const Branches = ({navigation}) => {
    const {profile} = useAuthContext()

    const {data:branches,loading,error} = useFetchCollection('branches',where('companyId','==',profile.companyId))

    const [searchText , SetSearchText] = useState('')
    const [filtered,setFiltered] = useState([])
    const[noMatch ,setNoMatch] = useState(false)
  
  

  
    // Filter employees based on the search query
    const searchList=()=>{
     const filteredbranch= branches?.filter(branch =>
        branch.name.toLowerCase().includes(searchText.toLowerCase())
      );
     
      setNoMatch(filteredbranch.length === 0)
  
      setFiltered(filteredbranch)
    }
  
    const onChange=(e)=>{
      if(e === ''){
        setFiltered([])
        setNoMatch(false)
      }
      SetSearchText(e)
    }
  
    const renderItem=({item})=>(
      <BranchCard item={item} onPress={()=>navigation.navigate('branchform',{data:item,action:'edit'})}/>
    )
  
  
   
  
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
        data={filtered.length ===0 ? branches:filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
  />}
  <TouchableOpacity className='absolute right-4 bottom-10' onPress={()=>navigation.navigate('branchform')}>
        <View className='bg-blue-400 p-1.5 rounded-3xl w-28 flex-row justify-center items-center '>
          <Text className='text-white font-semibold text-2xl mr-2 bottom-0.5'>+</Text>
          <Text className='text-white font-semibold text-lg'>Add</Text>
        </View>
        </TouchableOpacity>
      </View>
    )
}

export default Branches

const styles = StyleSheet.create({})