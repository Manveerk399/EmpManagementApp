
import { Pressable, StyleSheet, Text, View,Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../../../components/CustomInput'
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect'
import { useAuthContext } from '../../../../../context/AuthContext'
import { createDocument,updateDocument } from '../../../../../firebase/firebaseActions'
import CustomButton from '../../../../../components/CustomButton/CustomButton'
import { Required } from '../../../../Shifts/AssignShifts'



const validationRules={
  name:{required:'A name is required.'},
}

const JobTitleForm = ({navigation,route}) => {

  // const{data:options,loading} = usefetchFormData()
  const {companyInfo,profile} = useAuthContext()
  const { data,action } = route.params || {data:{},action:'add'};
  const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
      defaultValues:action==='edit'? data
      :{
          name:'',
          responsibilities:'',
          companyId:profile?.companyId,
      }
  })

  




  const handleSave=(data)=>{
      console.log(data)
  
      try{
        if(action=='edit'){
          updateDocument('jobtitles',data)
  
        }else{ createDocument('jobtitles',data)}
  
        navigation.goBack()
      }
      catch(error){
        alert(error)
      }
  
      
    }



  return (
      <ScrollView className='bg-white flex-1 p-6'contentContainerStyle={{ paddingBottom:40 }}>
        <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
        <Text className='text-lg font-bold'>{action==='add'?'Create':'Edit'} Job Title</Text>
        <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
        </View> 
        <View className='flex-1 mt-3'>
          <Required text='Title' />
          <CustomInput control={control} rules={validationRules.name} name='name' placeholder='title'/>
          
      <Text>Responsibilities</Text>
      <CustomInput name='responsibilities' multiline={true} placeholder='Description...' control={control} />
       </View>

    


        <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
      </ScrollView>
    )

}

export default JobTitleForm

const styles = StyleSheet.create({})