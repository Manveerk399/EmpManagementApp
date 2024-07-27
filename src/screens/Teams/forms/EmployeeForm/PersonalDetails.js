import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInput from '../../../../components/CustomInput/CustomInput'
import CustomSelect from '../../../../components/CustomSelect/CustomSelect'
import { ScrollView } from 'react-native-gesture-handler'
import CustomDatePicker from '../../../../components/CustomDatePicker/CustomDatePicker'
import { Required } from '../../../Shifts/AssignShifts'
import { EvilIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const validationRules={
    firstname:{required:'firstname is required'},
    lastname:{required:'lastname is required'},
    email:{required:'email is required'},
    gender:{required:'gender is required'},
    dob:{required:'DOB is required'},



}


const genderOptions=[
  {value:1,label:'Male'},
  {value:2,label:'Female'},
  {value:3,label:'other'},
]


const maritalOptions=[
  {value:1,label:'Single'},
  {value:2,label:'Married'},
  {value:3,label:'Divorced'},
  
]

const PersonalDetails = ({control,handleSetDate,timeModalActions}) => {

  const{handleConfirm,isTimePickerVisible,hideTimePicker,showTimePicker} = timeModalActions

  console.log('Gender Options:', genderOptions);
  console.log('Marital Options:', maritalOptions);
  return (
    
    <ScrollView className='flex-1 p-3' contentContainerStyle={{ paddingBottom:30 }}>
      <Text>Firstname<Text className='text-red-600'>*</Text></Text>
      <CustomInput name='firstname' rules={validationRules.firstname} placeholder='Firstname' control={control} />

      <Text>Lastname<Text className='text-red-600'>*</Text></Text>
      <CustomInput name='lastname' rules={validationRules.lastname} placeholder='Lastname' control={control} />

      <Text>Email<Text className='text-red-600'>*</Text></Text>
      <CustomInput name='email' rules={validationRules.email} placeholder='example@gmail.com' control={control} />

      <Text>Gender<Text className='text-red-600'>*</Text></Text>
      <CustomSelect name='gender' rules={validationRules.gender} placeholder='Select gender' control={control} options={genderOptions}/>

      <Text>Marital Status</Text>
      <CustomSelect name='marital' placeholder='Select marital status' control={control} options={maritalOptions}/>

      <Required text='Date of Birth'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.dob} name='dob' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('dob')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>

      



      <DateTimePickerModal
        isVisible={isTimePickerVisible.show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />

    </ScrollView>
  )
}

export default PersonalDetails

const styles = StyleSheet.create({})