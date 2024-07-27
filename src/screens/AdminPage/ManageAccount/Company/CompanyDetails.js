import { ScrollView, StyleSheet, Text, View,Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../../../../components/CustomInput'
import { useAuthContext } from '../../../../context/AuthContext'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import CustomSelect from '../../../../components/CustomSelect/CustomSelect'
import { useForm } from 'react-hook-form'
import { Required } from '../../../Shifts/AssignShifts'
import { setupCompanyListener } from '../../../../context/AuthContext'
import { createDocumentNoDup, updateDocument } from '../../../../firebase/firebaseActions'
import * as ImagePicker from 'expo-image-picker';
import { uploadfile } from '../../../../components/CustomDocPicker/uploadFile'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../../../firebase/config'
import { KeyboardAvoidingView } from 'react-native'

const validationRules={
  name:{required:'Name is required'},
  email:{required:'Contact Email is required'},
  
}


const CompanyDetails = ({navigation}) => {
  const {companyInfo,profile} = useAuthContext()
  
  const {control,handleSubmit,setValue,getValues,reset,formState:{errors},watch} = useForm({
    defaultValues:{
      companyname:'',
      phonenum:'',
      email:'',
      website:'',
      address1:'',
        address2:'',
        country:'',
        city:'',
        postalcode:'',
        id:profile?.companyId,
        logo:''
    }
  })
  const [uploading,setUploading]=useState(false)
  const [url,setUrl]=useState(null)

  const handleImagePick = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUploading(true);
      const response = await uploadfile(profile.companyId, result.assets[0],'logo');

      setValue('logo', response);
      

      await updateDocument('companies',{...getValues(),logo:response})

      setUploading(false);
    }

    
  };


  const handleSave=async(data)=>{
    try{
      
    
      await updateDocument('companies',data)

      // navigation.goBack()
    }catch(error){
      
      alert(error)
    }
  }

  const downloadFile = async () => {
    try {
      console.log('logo',watch('logo'))
      const fileRef = ref(storage, watch('logo'));
      const downloadUrl = await getDownloadURL(fileRef);

      

      setUrl(downloadUrl)

      
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(()=>{      
        const companyListener = setupCompanyListener(profile.companyId,reset);
        
        return () => {
          companyListener();
        };
      
  },[])

  useEffect(()=>{

    if(watch('logo')){
      downloadFile()
    }

  },[watch('logo')])


  console.log('url',url)

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <ScrollView className='flex-1 p-3'contentContainerStyle={{ paddingBottom:30 }}>
    <View className='flex items-center justify-center'>
    {url && <Image
        source={{uri:url}}
        style={styles.image}
        
      />}
    <View className='self-center flex-row mt-3'><CustomButton text={url?'Change Logo':'Add Logo'} width='40%' onPress={handleImagePick}/></View>
      
    </View>
      
    <Required text='Name'/>
    <CustomInput name='companyname' rules={validationRules.name} placeholder='Company Name' control={control} />

    <Text>Contact number</Text>
    <CustomInput name='phonenum'  placeholder='Contact number' control={control} />

    <Required text='Contact Email'/>
    <CustomInput name='email' rules={validationRules.email}  placeholder='Contact email' control={control} />

    
    <Text>Website</Text>
    <CustomInput name='website'  placeholder='Website' control={control} />

    <Text>Address</Text>
    <CustomInput name='address1'  placeholder='Address Line 1' control={control} />
    <CustomInput name='address2'  placeholder='Address Line 2' control={control} />
    <CustomInput name='country'  placeholder='Country' control={control} />
    <CustomInput name='city'  placeholder='City' control={control} />
    <CustomInput name='postalcode'  placeholder='Postal Code' control={control} />

    <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
  </ScrollView>
  </KeyboardAvoidingView>
)
}

export default CompanyDetails

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  container:{
    flex:1
  }
})