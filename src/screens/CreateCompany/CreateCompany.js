import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../context/AuthContext'
import { createDocument, createDocumentNoDup } from '../../firebase/firebaseActions'


const CreateCompany = ({navigation}) => {

  const {profile,setCompanyInfo} = useAuthContext()
  const {control,handleSubmit,formState:{errors}} = useForm() 
  const [loading,setLoading]=useState(false)


  const registerComp=async(data)=>{
    console.log('register',profile)
  try{
    const compInfo={
      ...data,
      companyname:data.companyname.trim(),
      superadminid:profile.uid,
      superadminname:`${profile.fullname}`
    }
    console.log('register data',compInfo)
    setLoading(true)
    await createDocumentNoDup('companies',compInfo,'companyname','Company')

    setCompanyInfo(compInfo)

    setLoading(false)

    navigation.navigate('Dashboard')
  }catch(error){
    setLoading(false)
    alert(error)
  }

  }


  return (
    <View className='flex-1 p-7 bg-blue-500 gap-5'>
    <View>
      <Text className='text-semibold text-2xl self-start'>Register your Company</Text>
      <Text className='text-semibold text-xs self-start'>You can update these information in the company profile settings.</Text>
      </View>
      <View className='items-center'>
        <CustomInput name='companyname' rules={{required:'company name is required',}}  control={control} placeholder='Company Name'/>
        <CustomInput name='phonenum'  rules={{required:'phone num is required',}} control={control} placeholder='Phone Number'/> 
        <CustomInput name='country' rules={{required:'country is required',}} control={control} placeholder='Country'/> 
        <CustomInput name='city' rules={{required:'city is required',}} control={control} placeholder='City'/> 
        <CustomButton text={loading?'Loading...' : 'Register'} width='80%' onPress={handleSubmit(registerComp)} />
      </View>
    </View>
  )
}

export default CreateCompany

const styles = StyleSheet.create({})