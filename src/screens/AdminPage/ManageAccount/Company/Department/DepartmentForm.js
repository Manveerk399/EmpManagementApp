import { Pressable, StyleSheet, Text, View,Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../../../components/CustomInput'
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect'
import { useAuthContext } from '../../../../../context/AuthContext'
import { createDocument,updateDocument } from '../../../../../firebase/firebaseActions'
import CustomButton from '../../../../../components/CustomButton/CustomButton'
import { Required } from '../../../../Shifts/AssignShifts'
import Company from '../Company'
import { usefetchFormData } from './departmentActions'
import { count, where } from 'firebase/firestore'
import useFetchCollection from '../../../../../firebase/useFetchCollection'
import { ActivityIndicator } from 'react-native-paper'


const validationRules={
    departmentlead:{required:'Department leader is required.'},
    name:{required:'A name is required.'}
}

const DepartmentForm = ({navigation,route}) => {

    const{data:options,loading} = usefetchFormData()
    const [saving ,setSaving]=useState(false)
    const {companyInfo,profile} = useAuthContext()
    const {data:emps,loading:emploading} = useFetchCollection('users',where('companyId','==',profile.companyId))
    const { data,action } = route.params || {data:{},action:'add'};
    const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
        defaultValues:action==='edit'? data
        :{
            name:'',
            leader:'',
            companyId:profile?.companyId,
            count:0,
        }
    })

    console.log('options',options,loading,watch('leader'))




    const handleSave=(data)=>{
        console.log(data)
    
        try{
          if(action=='edit'){
            updateDocument('departments',data)
    
          }else{ createDocument('departments',data)}
    
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
        <ScrollView className='bg-white flex-1 p-6'contentContainerStyle={{ paddingBottom:40 }}>
          <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
          <Text className='text-lg font-bold'>{action==='add'?'Create':'Edit'} Department</Text>
          <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
          </View> 
          <View className='flex-1 mt-3'>
            <Required text='Name' />
            <CustomInput control={control} rules={validationRules.name} name='name' placeholder='Department name'/>
            
        <Required text='Department Lead' />
        <CustomSelect name='leader' rules={validationRules.departmentlead} placeholder='Select department leader' control={control} options={emps.map(emp => ({value:emp.uid,label:emp.fullname}))}/>
         </View>
    
          <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
        </ScrollView>
      )
  
}

export default DepartmentForm

const styles = StyleSheet.create({})