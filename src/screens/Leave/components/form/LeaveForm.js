import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from "@react-native-community/datetimepicker"
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Pressable,Platform} from 'react-native'
import { TextInput } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { Button } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import CustomInput from '../../../../components/CustomInput/CustomInput'
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker'
import CustomSelect from '../../../../components/CustomSelect/CustomSelect'
import { useAuthContext } from '../../../../context/AuthContext'
import { useLeaveAction } from '../../useLeaveActions'
import { useNavigation } from 'expo-router'

const options=[
  {key:'1',value:'Annual Leave'},
  {key:'2',value:'Sick Leave'},
  {key:'3',value:'Early Leave'},
  {key:'4',value:'Maternity Leave'},
]

const LeaveForm = () => {

 const navigation = useNavigation()
  const {profile} = useAuthContext()
  const {addLeave} = useLeaveAction()
  const currentdate = new Date()

  const {control,handleSubmit,watch,setValue} = useForm({
    defaultValues:{
      firstDate:currentdate.toDateString(),
      notes:'',
      status:'Requested'
    }
})

const onsubmit=async(data)=>{
  
  await addLeave(profile,data)

  navigation.goBack()
}


const handleSetDateValue=(name,value)=>{
  setValue(name,value)
}
  




  return (
<View style={styles.container}>


  <Text style={styles.label}>Leave Type</Text>
  <CustomSelect name='leaveType' control={control} placeholder='Select leave type' options={options} />    

     
  <Text  style={styles.label}>First Day</Text>
  <CustomDatePicker control={control} name='firstDate' handleSetDate={handleSetDateValue} placeholder='Select first day'/>

  <Text  style={styles.label}>Last Day</Text>
  <CustomDatePicker control={control} name='lastDate' handleSetDate={handleSetDateValue} placeholder='Select last day'/>


  <Text  style={styles.label}>Notes</Text>  
  <CustomInput name='notes' control={control} multiline={true} placeholder='Notes'/>





  
        

<Button textColor='black'  onPress={handleSubmit(onsubmit)}>Submit</Button>
</View>
  )
}

export default LeaveForm

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:30,
  },

  label:{
    fontSize:16,
    fontWeight:'500',
    marginBottom:3
  }


})