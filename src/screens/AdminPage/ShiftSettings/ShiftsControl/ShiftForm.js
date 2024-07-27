import { Pressable, StyleSheet, Text, View,Switch, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomInput from '../../../../components/CustomInput'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomSwitch } from '../../../../components/CustomSwitch/CustomSwitch';
import CustomSelect, { CustomDropdownPicker } from '../../../../components/CustomSelect/CustomSelect';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { useAuthContext } from '../../../../context/AuthContext';
import { createDocument, updateDocument } from '../../../../firebase/firebaseActions';
import CustomMultiSelect from '../../../../components/CustomSelect/CustomMultiSelect';
import { Required } from '../../../Shifts/AssignShifts';
import { MaterialIcons } from '@expo/vector-icons';

const weekends=[
    {value:'Monday',label:'Monday'},
    {value:'Tuesday',label:'Tuesday'},
    {value:'Wednesday',label:'Wednesday'},
    {value:'Thursday',label:'Thursday'},
    {value:'Friday',label:'Friday'},
    {value:'Saturday',label:'Saturday'},
    {value:'Sunday',label:'Sunday'},
]

const ShiftForm = ({navigation,route}) => {

 const [isTimePickerVisible, setTimePickerVisibility] = useState({show:false});
 const [selectedTime, setSelectedTime] = useState('');
 const [isEnabled, setIsEnabled] = useState(false);
 const {companyInfo,profile} = useAuthContext()

 const { data,action } = route.params || {data:{},action:'add'};


 
 

  const toggleSwitch = (e,name) => {
    setValue(name,e)
  };

  
  const {control,handleSubmit,setValue,formState:{errors},watch} = useForm({
    defaultValues:action ==='edit'
    ?data
    :{
      shiftmargin:false,
      shiftallowance:false,
      allowance:'0',
      before:'00:00',
      after:'00:00',
      weekends:[],
      companyId:profile.companyId
    }
  })

  const watchShiftMargin = watch('shiftmargin')
  const watchShiftAllowance = watch('shiftallowance')
  const watchFrom = watch('from')
  const watchTo = watch('to')
  const watchBefore = watch('before')
  const watchAfer = watch('after')

  const validationRules ={
    name:{required:'Shift name is required.'},
    from:{required:'from time is required.'},
    to:{required:'to time is required.'},
    before:{required:watchShiftMargin?'before is required.':false},
    after:{required:watchShiftMargin?'after is required.':false},
    rate:{required:watchShiftAllowance?'Rate is required.':false, pattern:watchShiftAllowance? {
      value: /^[0-9]*$/,
      message: 'Only numbers are allowed'
    }:''},
    weekends:{required:'Weekends is required.'},

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

  const handleConfirm = (time) => {
    //console.log(time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))


    const isShiftMargin = ['before','after'].includes(isTimePickerVisible.name)

    if(isShiftMargin){
       
      const formattedTime = time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false, // Set to false to remove AM/PM indicators
      });
      
      console.log(formattedTime);
      setValue(isTimePickerVisible.name,formattedTime);

    }
    else{
    setValue(isTimePickerVisible.name,time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    }
    hideTimePicker();
  };


  const handleSave=(data)=>{
    console.log(data)

    try{
      if(action=='edit'){
        updateDocument('shifts',data)

      }else{ createDocument('shifts',data)}

      navigation.goBack()
    }
    catch(error){
      alert(error)
    }

    
  }

  const showHelp = () => {
    Alert.alert(
      'Shift Settings Overview',
      'Shift Margin: Define the time boundaries within which payable hours are calculated. You can set extra time limits before or after the shift to adjust the interval for calculating hours.\n\n' +
      'Weekends: Shifts will not be assigned on weekends.\n\n' +
      'Shift Allowance: This is an extra payment for working certain shifts, like night or weekend shifts. Specify the allowance to compensate employees for less desirable shifts.',
      [{ text: 'OK' }]
    );
  };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <ScrollView className='bg-white flex-1 p-6'   contentContainerStyle={{ paddingBottom:40 }}>
      <View className='flex-row items-center justify-between p-2' style={{borderBottomWidth:1}}> 
      <Text className='text-lg font-bold'>Create Shift</Text>
      <Pressable onPress={()=>navigation.goBack()} ><Text>Cancel</Text></Pressable>
      </View> 
      <View className='mt-3'>
        <Pressable onPress={showHelp} className='self-end'><MaterialIcons name="help-center" size={26} color="gray" /></Pressable>
        <CustomInput control={control} rules={validationRules.name} name='name' placeholder='Shift name'/>

        <View className='flex-row gap-2 mt-3'>
            <Pressable onPress={()=>showTimePicker('from')} className='flex-1 justify-center'>
            <Required text='From'/>
            <CustomInput control={control} rules={validationRules.from} name='from' placeholder='select time' editable={false}/>

            </Pressable>

            <Pressable onPress={()=>showTimePicker('to')} className='flex-1 justify-center'>
            <Required text='To'/>
            <CustomInput control={control} rules={validationRules.to} name='to' placeholder='select time' editable={false}/>
            </Pressable>
            
        </View>


        
        <View className='flex-row items-center mt-4'>
             
            <Text>Shift Margin</Text>
            
        <CustomSwitch name='shiftmargin' toggleSwitch={toggleSwitch} control={control}/>
      </View>
      {watchShiftMargin && <View className='flex-row gap-2 mt-3'>
        
      <Pressable onPress={()=>showTimePicker('before')} className='flex-1 justify-center'>
            <Required text='Before'/>
            <CustomInput control={control} rules={validationRules.before} name='before' placeholder='select hours' editable={false}/>
            </Pressable>

            <Pressable onPress={()=>showTimePicker('after')} className='flex-1 justify-center'>
            <Required text='After'/>
            <CustomInput control={control} rules={validationRules.after} name='after' placeholder='select hours' editable={false}/>
            </Pressable>





      </View>}

      <View className='flex-row items-center mt-4'>
            <Text>Shift Allowance</Text>
        <CustomSwitch name='shiftallowance' toggleSwitch={toggleSwitch} control={control}/>
      </View>
      
        {watchShiftAllowance &&    
             <CustomInput name='allowance' rules={validationRules.rate} control={control} placeholder='Rate per day'/> 
        }
      

      <View className='mt-6'>
      <Required text='Weekends'/>
        <CustomMultiSelect name='weekends' rules={validationRules.weekends} control={control} options={weekends} setSelected={setSelected} />
      </View>


      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible.show}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        
        locale={isTimePickerVisible.name==='before'|| isTimePickerVisible.name==='after'?"en_GB":''}
      />

      <View className='self-center flex-row mt-3'><CustomButton text='Save' width='90%' onPress={handleSubmit(handleSave)}/></View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ShiftForm

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})