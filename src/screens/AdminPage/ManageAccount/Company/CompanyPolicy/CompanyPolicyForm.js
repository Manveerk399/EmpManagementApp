
import { Pressable, StyleSheet, Text, View,Switch, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomInput from '../../../../../components/CustomInput'
import CustomSelect from '../../../../../components/CustomSelect/CustomSelect'
import { useAuthContext } from '../../../../../context/AuthContext'
import { createDocument,updateDocument } from '../../../../../firebase/firebaseActions'
import CustomButton from '../../../../../components/CustomButton/CustomButton'
import { Required } from '../../../../Shifts/AssignShifts'
import { CommonActions } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
// import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import { uploadfile,downloadFile } from '../../../../../components/CustomDocPicker/uploadFile'


const validationRules={
  name:{required:'A name is required.'},
}

const CompanyPolicyForm = ({navigation,route}) => {

  // const{data:options,loading} = usefetchFormData()
  const {companyInfo,profile} = useAuthContext()
  const { data,action } = route.params || {data:{},action:'add'};
  const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
      defaultValues:action==='edit'? data
      :{
          name:'',
          file:'',
          companyId:profile?.companyId,
      }
  })

  const [uploading,setUploading]=useState(false)

  const handleFilePick = async () => {
    
      try {
        const res = await DocumentPicker.getDocumentAsync({});


        console.log(res)
       
        if (res.assets.length > 0 ) {
          // console.log('selected',res.assets[0].uri)
          setUploading(true)
          const response =await uploadfile(profile.companyId,res.assets[0],res.assets[0].name)

          setValue('file',response)

          setUploading(false)
          // setFileName(res.name);
          // setValue('file', res);
        }
      } catch (err) {
        console.error(err);
      }

    
  };

  


  // const uploadFile = async (file, onChange) => {
  //   setUploading(true);
  //   const { uri, name } = file[0];
  //    console.log('file selected',name)
  // };

  




  const handleSave=(data)=>{
      console.log(data)
  
      try{
        if(action=='edit'){
          updateDocument('policies',data)
  
        }else{ createDocument('policies',data)}
  
        navigation.goBack()
      }
      catch(error){
        alert(error)
      }
  
      
    }



  return (
      <ScrollView className='bg-white flex-1 p-6'contentContainerStyle={{ paddingBottom:40 }}>
        <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
        <Text className='text-lg font-bold'>{action==='add'?'Create':'Edit'} Company Policy</Text>
        <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
        </View> 
        <View className='flex-1 mt-3'>
          <Required text='Title' />
          <CustomInput control={control} rules={validationRules.name} name='name' placeholder='title'/>
          
          <Pressable onPress={() => handleFilePick()} className='flex-row p-3 items-center justify-center bg-zinc-200 rounded-full'>
          <Entypo name="upload" size={24} color="black" />
          <Text className='ml-3'>Upload Document</Text>
          </Pressable>

          <Pressable className='mt-5 mb-5' onPress={()=>downloadFile(watch('file'))}>
            <Text>File Uploaded:</Text>
            <Text className='underline text-blue-500'>{watch('file')}</Text>
          </Pressable>
    
       </View>

    


        {!uploading 
        ?<View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
      
      :<View className='self-center flex-row mt-3'><CustomButton text='Uploading...' width='90%'/></View>}
      </ScrollView>
    )

}

export default CompanyPolicyForm

const styles = StyleSheet.create({})