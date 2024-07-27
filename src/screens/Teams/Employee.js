import { StyleSheet, Text, View,SectionList, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import useFirestoreCollection from '../../firebase/useFirestoreCollection'
import EmployeeCard from './EmployeeCard'
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';



const Employee = ({navigation}) => {

  const { data: employees, loading, error } = useFirestoreCollection('employees','fullname');
  const [searchText , SetSearchText] = useState('')
  const [filteredEmployees,setFilteredEmployees] = useState([])
  const[noMatch ,setNoMatch] = useState(false)


  const list = filteredEmployees.length > 0 ?filteredEmployees : employees

  

  //console.log(employees)

  if (loading) {

    return <View className='flex-1 items-center justify-center'><ActivityIndicator animating={true} color={MD2Colors.blue400} size={40}/></View>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Filter employees based on the search query
  const searchEmployees=()=>{
   const filteredEmps= employees.filter(employee =>
      employee.fullname.toLowerCase().includes(searchText.toLowerCase())
    );
   

    console.log('searching',filteredEmps)
  
  setNoMatch(filteredEmps.length === 0)

   setFilteredEmployees(filteredEmps)
  }

  const onChange=(e)=>{
    if(e === ''){
      setFilteredEmployees([])
      setNoMatch(false)
    }
    SetSearchText(e)
  }


  // Group employees by the first letter of their first name
  const groupedEmployees = list.reduce((acc, employee) => {
    const firstLetter = employee.fullname[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    //console.log(firstLetter,employee)
    acc[firstLetter].push(employee);
    return acc;
  }, {});


  
   

  // Convert the groupedEmployees object into an array of sections for SectionList
  const sections =Object.entries(groupedEmployees).map(([letter, employees]) => (
    {
    title: letter,
    data: employees,
  })

  
);

  


  const renderItem=({item})=>{

    // return <Text >{item.fullname}</Text>
  
    return <EmployeeCard info={item} />
  }

  return (
    <View className='flex-1 p-4 bg-zinc-100 relative'>
      <View className='flex-row items-center justify-end mr-2 mb-2 gap-2'>
        <View className='flex-1 bg-white rounded-3xl justify-center p-3'>
          <TextInput placeholder='search employee' placeholderTextColor='gray' onChangeText={onChange} value={searchText}/>
        </View>
      <Pressable onPress={searchEmployees}>
      <FontAwesome name="search" size={16} color="gray" />
      </Pressable>

      </View>
      {
      noMatch ? <View className='flex-1 items-center jusrify-center mt-5'>

        <Text className='font-bold text-gray'>No Match Found</Text>
      </View>
      
      
      
      
      :<SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{padding: 10 }}>
          <Text className='text-zinc-400 font-bold'>{title}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}

      ItemSeparatorComponent={()=><View className='h-4'/>}
    />}
      
   
      {/* <CustomButton text='Add' onPress={()=>navigation.navigate('CreateEmp')}/> */}
       <TouchableOpacity className='absolute right-4 bottom-10' onPress={()=>navigation.navigate('CreateEmp')}>
      <View className='bg-blue-400 p-1.5 rounded-3xl w-28 flex-row justify-center items-center '>
        <Text className='text-white font-semibold text-2xl mr-2 bottom-0.5'>+</Text>
        <Text className='text-white font-semibold text-lg'>Add</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

export default Employee

const styles = StyleSheet.create({})