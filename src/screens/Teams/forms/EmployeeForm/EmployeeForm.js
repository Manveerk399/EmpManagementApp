import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'
import EmployeeFormTab from './EmployeeFormTab'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { FIREBASE_AUTH,db } from '../../../../firebase/config'
import { createUserWithEmailAndPassword,signOut } from 'firebase/auth'
import { createDocument } from '../../../../firebase/firebaseActions'
import { useNavigation } from '@react-navigation/native'

const EmployeeForm = () => {

  const navigation = useNavigation()
  const currentdate = new Date()

  const {control , handleSubmit,setValue} = useForm({
    defaultValues:{
      dob:currentdate.toDateString(),
      
      

    }
})

const generatePassword = () => {
  return Math.random().toString(36).slice(-8); // Simple password generator
};

  const onSubmit=async (data)=>{
    // console.log(data)

    // const password = generatePassword();
    try {
      // Create user with email and password
      // const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH,data.email, password);
      // const uid = userCredential.user.uid;
      const payload ={
        ...data,
        fullname:`${data.firstname} ${data.lastname}`,
      }

      await createDocument('employees',payload)

      navigation.navigate('Teams')
      
    } catch (error) {
      console.log(error.message)
    }

  }

  const handleSetDateValue=(name,value)=>{
    setValue(name,value)
  }

  
  return (
    <View className='flex-1 p-5 bg-slate-100'>
        <Text className='text-2xl font-bold mb-8'>New Employee</Text>
        <EmployeeFormTab control={control} handleSetDate={handleSetDateValue}/>
        
        <View className='flex-row items-center justify-center w-85 gap-3'>
        <View className='flex-1'>
        <CustomButton text='Submit' onPress={handleSubmit(onSubmit)}/>
        </View>
        <View className='flex-1'>
        <CustomButton text='Cancel' onPress={()=>navigation.goBack()}/>
        </View>
        </View>
   
    </View>
  )
}

export default EmployeeForm

const styles = StyleSheet.create({})