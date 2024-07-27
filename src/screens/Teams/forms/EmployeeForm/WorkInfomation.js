import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import CustomSelect from '../../../../components/CustomSelect/CustomSelect'
import { EvilIcons } from '@expo/vector-icons';
import { Required } from '../../../Shifts/AssignShifts'
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { useFetchDropdowns } from './useFetchDropdowns';

const validationRules={
  branch:{required:'Branch is required.'},
  department:{required:'Department is required.'},
  reportmanager:{required:'Report manager is required.'},
  specificrole:{required:'Specific role is required.'},
  accessrole:{required:'Access role is required.'},
  employmenttype:{required:'Employement type is required.'},
  employmentstatus:{required:'Employement status is required.'},
  datejoining:{required:'Date joining is required.'}
  


}

const branch=[
  {key:1,label:'branch1'},
  {key:2,label:'branch2'},

]

const department=[
  {value:1,label:'department1'},
  {value:2,label:'department2'},

]

const manager=[
  {value:1,label:'manager1'},
  {value:2,label:'manager2'},
 
]

const role=[
  {value:1,label:'role1'},
  {value:2,label:'role2'},
]

const accessrole=[
  {value:1,label:'Admin'},
  {value:2,label:'User'},
  
]

const emptype=[
  {value:1,value:'fulltime'},
  {value:2,value:'casual'},
  
]

const empstatus=[
  {value:1,label:'Active'},
  {value:2,label:'Resigned'},
  {value:3,label:'Terminated'},
  {value:4,label:'Probation'},
  
]


const WorkInfomation = ({control, timeModalActions}) => {

    const {data,loading} = useFetchDropdowns()

    console.log('data',data,loading)
  
    const{handleConfirm,isTimePickerVisible,hideTimePicker,showTimePicker} = timeModalActions

   if(loading){
    return <View className='flex-1 justify-center items-center'>
      <Text>Loading...</Text>
    </View>
   }

    return (
      
      <ScrollView className='flex-1 p-3' contentContainerStyle={{ paddingBottom:30 }}>

        <Required text='Branch' />
        <CustomSelect name='branch' rules={validationRules.branch} placeholder='Select branch' control={control} options={data.branchOptions}/>

        <Required text='Department' />
        <CustomSelect name='department' rules={validationRules.department} placeholder='Select department' control={control} options={data.departmentOptions}/>

        <Required text='Reporting Manager' />
        <CustomSelect name='reportingmanager' rules={validationRules.reportmanager} placeholder='Select reporting manager' control={control} options={data.empOptions}/>

        <Required text='Specific Role' />
        <CustomSelect name='specificrole' rules={validationRules.specificrole} placeholder='Select role' control={control} options={data.jobOptions}/>


        <Required text='App Access Role' />
        <CustomSelect name='accessrole' rules={validationRules.accessrole} placeholder='Select role' control={control} options={accessrole}/>


        <Required text='Employment Type' />
        <CustomSelect name='emptype' rules={validationRules.employmenttype} placeholder='Select type' control={control} options={data.empTypeOpt}/>
        
        <Required text='Employement Status' />
        <CustomSelect name='empstatus' rules={validationRules.employmentstatus} placeholder='Select status' control={control} options={empstatus}/>

        
        <Required text='Date Joining'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.datejoining} name='datejoining' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('datejoining')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
        
        <Text>Date Exiting</Text>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} name='dateexiting' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('dateexiting')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>

            <Text>Reasons</Text>
            <CustomInput name='reasons' multiline={true} placeholder='Reasons' control={control} /> 
  
  
  
        <DateTimePickerModal
          isVisible={isTimePickerVisible.show}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
  
      </ScrollView>
  )
}

export default WorkInfomation

const styles = StyleSheet.create({})