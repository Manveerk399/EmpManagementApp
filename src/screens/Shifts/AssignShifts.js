import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CustomSelect, { CustomDropdownPicker } from '../../components/CustomSelect/CustomSelect'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../context/AuthContext'
import useFetchCollection from '../../firebase/useFetchCollection'
import { where } from 'firebase/firestore'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import CustomButton from '../../components/CustomButton/CustomButton'
import { convertToDateFormat } from '../../utility/getDate'
import { EvilIcons } from '@expo/vector-icons';
import CustomInput from '../../components/CustomInput/CustomInput'
import { savingShifts,changingShifts,deleteShifts } from './ShiftActions'
import { ActivityIndicator } from 'react-native-paper'
import CustomMultiSelect from '../../components/CustomSelect/CustomMultiSelect'

export const Required=({text})=>{
    return <View className='flex-row -start'><Text>{text}</Text><Text className='text-red-500 text-base relative bottom-1'>*</Text></View>
}

const AssignShifts = ({navigation,route}) => {

    const [saving ,setSaving]=useState(false)
    const { data,action } = route.params || {data:{},action:'add'};
    const [isTimePickerVisible, setTimePickerVisibility] = useState({show:false});
    const {companyInfo,profile} = useAuthContext()
    const {data:shifts,loading} = useFetchCollection('shifts',where('companyId','==',profile.companyId))
    const {data:emps,loading:emploading} = useFetchCollection('users',where('companyId','==',profile.companyId))
    const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
        defaultValues:action ==='edit'
        ?data
        :{
          employees:[],
          companyId:profile.companyId,
        }
      })

  const watchFrom = watch('from')
  const watchTo = watch('to')


  

  const validationRules={
    employees:{required:'must select at least 1 employee'},
    shift:{required:'shift name is required'},
    from:{required:'date from is required'},
    to:{required:'date to is required'},
  }
      const setSelected=(name,value)=>{
        setValue(name,value)
      }

      
  const showTimePicker = (name) => {
    setTimePickerVisibility({show:true,name:name});
  };

  const hideTimePicker = () => {
    setTimePickerVisibility({show:false});
  };


  const handleConfirm = (date) => {
    console.log('date',date)
  
    setValue(isTimePickerVisible.name,convertToDateFormat(date))
    
    hideTimePicker();
  };


  const handleSave=async (data)=>{
    // console.log('saving',data)

    
    

    setSaving(true)
    

    try{
    if(action==='change'){
      const shifttime = shifts.find(s => s.name === data.shiftname.label)
      await changingShifts({...data,shifttime:shifttime})
      setSaving(false)
    navigation.navigate('Shifts')
    }
    else if(action==='delete'){
      
        Alert.alert(
          "Sign Out",
          "Are you sure you want to sign out?",
          [
            {
              text: "Cancel",
              onPress: () => {navigation.navigate('Shifts') 
                setSaving(false)},
              style: "cancel"
            },
            { text: "OK", onPress:async()=>  {await deleteShifts({...data})
            setSaving(false)
            navigation.navigate('Shifts')
          
          }}
          ]
        );
    
    
    }
    else{
      const shifttime = shifts.find(s => s.name === data.shiftname.label)
      await savingShifts({...data,shifttime:shifttime})
      setSaving(false)
    navigation.navigate('Shifts')
    }
    
  }catch(error){
    alert(error)
  }
  }


  
      console.log('loading',loading)
      

      const getShiftOption=useCallback(()=>{

        console.log('here',shifts)

        return shifts?.map(shift=>({value:shift,label:shift.name}))
      },[shifts])

if(saving) return (
        <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
          <ActivityIndicator size="large" color="#0b99e6" />
          <Text className="mt-2 text-lg">Saving...</Text>
        </View>
      )

if(loading || emploading) return <View>
  <Text>Loading...</Text>
</View>
 
        
  return (
    <ScrollView className='bg-white flex-1 p-6'contentContainerStyle={{ paddingBottom:40 }}>
      <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
      <Text className='text-lg font-bold'>{action=== 'change'?'Change':action==='delete'?'Delete':'Assign'} Shift</Text>
      <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
      </View>
      <View className='mt-5'>
        <Required text='Applicable To'/>
        <CustomMultiSelect name='employees' control={control} rules={validationRules.employees} options={emps.map(emp => ({value:emp.uid,label:emp.fullname}))} setSelected={setSelected}/>

      {action !=='delete' && <><Required text='Shift Name'/>
        <CustomSelect name='shiftname' control={control} rules={validationRules.shift} placeholder='Select Shift Name' options={shifts?.map(shift=>({value:shift,label:shift.name}))} /></> } 
        


        
        <View className='mt-3'>
            
        <Required text='From'/>
            <View className='flex-row'>
            <View className='flex-1'><CustomInput control={control} rules={validationRules.from} name='from' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('from')} className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>

            </View>
   
            <Required text='To'/>
            <View className='flex-row'>
            <View className='flex-1'><CustomInput control={control} rules={validationRules.to} name='to' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('to')} className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>

            </View>
            
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible.show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />

      <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
      </ScrollView>
  )
}

export default AssignShifts

const styles = StyleSheet.create({})