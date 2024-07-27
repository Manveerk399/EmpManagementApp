import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { act, useState } from 'react'
import { ScrollView } from 'react-native'
import EmployeeFormTab from '../../../Teams/forms/EmployeeForm/EmployeeFormTab'
import { useForm } from 'react-hook-form'
import { useDateTimeModal } from '../../../../customHooks/useDateTimeModal'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { useAuthContext } from '../../../../context/AuthContext'
import { createDocument, updateDocument } from '../../../../firebase/firebaseActions'
import Reservation from 'react-native-calendars/src/agenda/reservation-list/reservation'

const AddUserForm = ({ navigation, route }) => {
    const [index, setIndex] = React.useState(0);
    const { action,data } = route.params || {action:'add',data:{}};
    const {profile} = useAuthContext()
    const [saving,setSaving]=useState(false)
    
    
    // console.log('in user form',data,action)

    const { control, handleSubmit, setValue,reset, formState: { errors }, watch } = useForm({
      defaultValues:action==='view' || action ==='edit' 
      ? data
   
      :{
        firstname:'',
        lastname:'',
        email:'',
        gender:'',
        dob:'',
        martial:'',
        workphonenum:'',
        persophonenum:'',
        address1:'',
        address2:'',
        country:'',
        city:'',
        postalcode:'',
        branch:'',
        department:'',
        reportingmanager:'',
        specificrole:'',
        accessrole:'',
        emptype:'',
        empstatus:'',
        datejoining:'',
        dateexiting:'',
        reasons:'',
        workexperience:[],
        education:[],
        companyId:profile?.companyId
      }
    });
  
    const timeModalActions=useDateTimeModal(setValue)


   
    const handleNext = () => {
      if (index < 4) { // Ensure not to exceed the number of tabs
        setIndex(prev => prev + 1);
      }
    };
  
    const handleBack = () => {
      if (index > 0) {
        setIndex(prev => prev - 1);
      }
    };

    
    const handleSave=async (data)=>{

      // console.log('savingg',formdata)
      try {
        setSaving(true)
        
        const payload ={
          ...data,
          fullname:`${data.firstname} ${data.lastname}`,
        }

        console.log('pay',payload)
        
        if(action === 'add'){
          await createDocument('users',payload)
  
       
        }else {
          await updateDocument('users',payload)
        }
        setSaving(false)
        reset()
         navigation.goBack()
      } catch (error) {
        console.log(error.message)
      }
  
    }
  
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create User</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
        <View style={styles.tabContainer}>
          <EmployeeFormTab control={control} index={index} setIndex={setIndex} timeModalActions={timeModalActions} mainFormFunction={{setMainFunc:setValue,mainValue:watch}} />
        </View>
        <View style={styles.footer}>
          {index !==0 &&<TouchableOpacity onPress={handleBack} style={styles.button}>
            <Text>Back</Text>
          </TouchableOpacity>}
        <CustomButton text={saving?'saving':'Save'} width='30%' onPress={handleSubmit(handleSave)}/>
          <TouchableOpacity onPress={handleNext} style={styles.button}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
     </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    tabContainer: {
      flex: 1,
      marginTop: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding:3,
      backgroundColor: 'white',
      
      
    },
    button: {
      padding: 10,
      backgroundColor: '#00ace6',
      borderRadius: 8,
      width:100,
      alignItems: 'center',
      // marginHorizontal: 5,
      marginTop:10,
      height:40
    },
  });
  
  export default AddUserForm;