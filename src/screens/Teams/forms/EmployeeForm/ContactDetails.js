import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import CustomSelect from '../../../../components/CustomSelect/CustomSelect'
import CustomInput from '../../../../components/CustomInput/CustomInput'

const validationRules={
  workphonenum:{required:'work phone number is required'},
  
}

const ContactDetails = ({control,timeModalActions}) => {
  return (
    <ScrollView className='flex-1 p-3'contentContainerStyle={{ paddingBottom:30 }}>
    <Text>Work Phone Number<Text className='text-red-600'>*</Text></Text>
    <CustomInput name='workphonenum' rules={validationRules.workphonenum} placeholder='Work phone number' control={control} />

    <Text>Personal Phone Number</Text>
    <CustomInput name='persophonenum'  placeholder='personal phone number' control={control} />

    <Text>Residential Address</Text>
    <CustomInput name='address1'  placeholder='Address Line 1' control={control} />
    <CustomInput name='address2'  placeholder='Address Line 2' control={control} />
    <CustomInput name='country'  placeholder='Country' control={control} />
    <CustomInput name='city'  placeholder='City' control={control} />
    <CustomInput name='postalcode'  placeholder='Postal Code' control={control} />

  </ScrollView>
)
}

export default ContactDetails

const styles = StyleSheet.create({})