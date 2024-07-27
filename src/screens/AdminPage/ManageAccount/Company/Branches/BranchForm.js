
import { Pressable, StyleSheet, Text, View,Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../../../components/CustomInput'
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect'
import { useAuthContext } from '../../../../../context/AuthContext'
import { createDocument,updateDocument } from '../../../../../firebase/firebaseActions'
import CustomButton from '../../../../../components/CustomButton/CustomButton'
import { Required } from '../../../../Shifts/AssignShifts'
import useFetchCollection from '../../../../../firebase/useFetchCollection'
import { where } from 'firebase/firestore'
import { ActivityIndicator } from 'react-native-paper'



const validationRules={
  admin:{required:'Admin is required.'},
  name:{required:'A name is required.'},
  address1:{required:'Address is required.'},
  city:{required:'City is required.'},
  country:{required:'Country is required.'},
  postalcode:{required:'Postal code is required.'},
  contactno:{required:'Contact No is required.'},
}

const DepartmentForm = ({navigation,route}) => {

  // const{data:options,loading} = usefetchFormData()
  const [saving ,setSaving]=useState(false)
  const {companyInfo,profile} = useAuthContext()
  const {data:emps,loading:emploading} = useFetchCollection('users',where('companyId','==',profile.companyId))
  const { data,action } = route.params || {data:{},action:'add'};
  const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
      defaultValues:action==='edit'? data
      :{
          name:'',
          admin:'',
          companyId:profile?.companyId,
          contactno:'',
          address1:'',
          address2:'',
          country:'',
          city:'',
          postalcode:'',
      }
  })

  




  const handleSave=(data)=>{
      // console.log(data)
      setSaving(true)
  
      try{
        if(action=='edit'){
          updateDocument('branches',data)
  
        }else{ createDocument('branches',data)}
        setSaving(false)
        navigation.goBack()
      }
      catch(error){
        alert(error)
      }
  
      
    }


if(saving) return (
      <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
        <ActivityIndicator size="large" color="#0b99e6" />
        <Text className="mt-2 text-lg">Saving...</Text>
      </View>
    )

if(emploading) return <View>
  <Text>Loading...</Text>
</View>


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1}}
  >
      <ScrollView className='bg-white flex-1 p-6'contentContainerStyle={{ paddingBottom:40 }}>
        <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
        <Text className='text-lg font-bold'>{action==='add'?'Create':'Edit'} Branch</Text>
        <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
        </View> 
        <View className='flex-1 mt-3'>
          <Required text='Name' />
          <CustomInput control={control} rules={validationRules.name} name='name' placeholder='Branch name'/>
          
      <Required text='Admin' />
      <CustomSelect name='admin' rules={validationRules.admin} placeholder='Select department leader' control={control} options={emps.map(emp => ({value:emp.uid,label:emp.fullname}))}/>
       </View>

      <Required text='Contact No.'/>
    <CustomInput name='contactno' rules={validationRules.contactno} placeholder='Contact no.' control={control} />

    <Text>Address<Text className='text-red-600'>*</Text></Text>
    <CustomInput name='address1' rules={validationRules.address1}  placeholder='Address Line 1' control={control} />
    <CustomInput name='address2'   placeholder='Address Line 2' control={control} />
    <CustomInput name='country' rules={validationRules.country}  placeholder='Country' control={control} />
    <CustomInput name='city'  rules={validationRules.city} placeholder='City' control={control} />
    <CustomInput name='postalcode' rules={validationRules.postalcode}  placeholder='Postal Code' control={control} />


        <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
      </ScrollView>
      </KeyboardAvoidingView>
    )

}

export default DepartmentForm

const styles = StyleSheet.create({})