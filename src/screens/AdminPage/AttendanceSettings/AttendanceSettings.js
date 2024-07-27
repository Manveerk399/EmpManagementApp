import { StyleSheet, Text, View,Switch, Pressable,ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { CustomSwitch } from '../../../components/CustomSwitch/CustomSwitch'
import { useForm } from 'react-hook-form'
import { useAuthContext } from '../../../context/AuthContext'
import { RadioButton, Text as PaperText ,Checkbox} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDateTimeModal } from '../../../customHooks/useDateTimeModal'
import { Required } from '../../Shifts/AssignShifts'
import { EvilIcons } from '@expo/vector-icons';
import CustomInput from '../../../components/CustomInput'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../../../components/CustomButton/CustomButton'
import { useAttendanceSettings } from './useAttendanceSettings'
import { update } from 'firebase/database'
import { createDocument, updateDocument } from '../../../firebase/firebaseActions'
import useFetchCollection from '../../../firebase/useFetchCollection'
import { where } from 'firebase/firestore'
import CustomMultiSelect from '../../../components/CustomSelect/CustomMultiSelect'

function findUncommonElements(array1, array2) {
  // Elements in array1 but not in array2
  const uniqueToArr1 = array1.filter(element => !array2.includes(element));
  
  // Elements in array2 but not in array1
  const uniqueToArr2 = array2.filter(element => !array1.includes(element));
  
  // Combine the unique elements
  return [...uniqueToArr1, ...uniqueToArr2];
}

const AttendanceSettings = () => {
  const {profile} = useAuthContext()
  const {data,loading,exist}=useAttendanceSettings()
  const {control,handleSubmit,setValue,reset,formState:{errors,isDirty},watch} = useForm()
  const timeModalActions=useDateTimeModal(setValue)
  const{isTimePickerVisible,hideTimePicker,showTimePicker} = timeModalActions
  const {data:shifts,loading:shiftloading} = useFetchCollection('shifts',where('companyId','==',profile.companyId))




  const isStrict=watch('strict')
  const islenient=watch('lenient')
  const allowdeviation=watch('allowOvertimeDeviations')
  const isMaxhours=watch('allowMaxHours')


  validationRules ={
    fullday:{required:watch('strictMode')==='manual' && isStrict ?'Full day is required.':false},
    half:{required:watch('strictMode')==='manual' && isStrict ?'Half day is required.':false},
    expectedHrs:{required:watch('lenientMode')==='manual'&& islenient?'Hours is required.':false},
    maxHours:{required:isMaxhours?'Maximum hours is required.':false},
    shifts:{required:'Select at least one option'},
  }
 
  

  const toggleSwitch = (e,name) => {

    if(name==='lenient'){
      
    setValue('lenient',e)
    setValue('strict',false)

    setValue('strictFullDay','00:00 hours')
    setValue('strictHalfDay','00:00 hours')
    setValue('strictMode','')


    }else{
    setValue('strict',e)
    setValue('lenient',false)
    setValue('lenientHours','00:00 hours')
    }
  };


  const handleConfirm = (time) => {
    //console.log(time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    
      const formattedTime = time.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false, // Set to false to remove AM/PM indicators
      });
      
      setValue(isTimePickerVisible.name,`${formattedTime} hours`);

     
   
    hideTimePicker();
  };



  const handleSave=(formdata)=>{

    if(exist){
      updateDocument('attendanceSettings',formdata)

      const removedshift = findUncommonElements(data.shifts,formdata.shifts)

    
      
      formdata.shifts.forEach(shift =>{
        const info = shifts.find(s => s.id === shift)
        delete formdata.shifts

        if(removedshift.includes(shift)){
          delete info.attendanceSettings
          updateDocument('shifts',{...info})


        }

      

        const data={
          ...info,
          attendanceSettings:formdata
        }

        updateDocument('shifts',data)
      })


    }else{
      createDocument('attendanceSettings',formdata)
      formdata.shifts.forEach(shift =>{
        const info = shifts.find(s => s.id === shift)

        delete formdata.shifts
        const data={
          ...info,
          attendanceSettings:formdata
        }

        updateDocument('shifts',data)
      })
    }
  }


  const handleMaxHours=()=>{

    if(!isMaxhours){
      setValue('maxHours','00:00 hours')

    }

    setValue('allowMaxHours',!isMaxhours)
  }


  // const shiftOptions=useMemo(()=>{
  //   return shifts?.map((shift)=>({
  //     value:shift.id,
  //     label:`${shift.name} (${shift.from}- ${shift.to})`

  //   }))
  // },[shifts])

  const setSelected=(name,value)=>{
    setValue(name,value)
  }

  

 

  useEffect(()=>{

    reset(data)
  },[data])
  

  if(loading || shiftloading){
    return <View>
      <Text>Loading...</Text>
    </View>
  }


  return (
    <ScrollView className='flex-1 bg-white' contentContainerStyle={{paddingBottom:50}}>
      <View className='flex-1'>
        <View style={{borderBottomColor:'black',borderBottomWidth:1}}>
      <Text className='p-4 text-gray-400'>Define how you want working hours to be calculated in your company.</Text>
      </View>
      <View>
      <View className='w-[250px] p-4'>
      <Required text='Applicable To'/>
      <CustomMultiSelect name='shifts' control={control} placeholder='Select shifts' rules={validationRules.shifts} options={shifts?.map((shift)=>({
      value:shift.id,
      label:`${shift.name} (${shift.from}- ${shift.to})`

    }))} setSelected={setSelected}/>
      </View>
      <Text className='m-3 font-semibold text-base text-zinc-500'>Expected Hours</Text>
        <View className='p-2 flex-row justify-evenly'>
          
        <View className='flex-row items-center'>
          <Text className='text-base font-semibold'>Strict</Text>
          <CustomSwitch name='strict' toggleSwitch={toggleSwitch} control={control}/>
        </View>

        <View className='flex-row items-center'>
          <Text className='text-base font-semibold'>Leniet</Text>
          <CustomSwitch name='lenient' toggleSwitch={toggleSwitch} control={control}/>
        </View>

        </View>

        {
          isStrict &&  <View style={styles.optionsContainer}>
            <View className='flex-row items-center'>
             <Pressable onPress={()=>setValue('strictMode','manual')} >
             <View 
             style={{borderColor:'#d1e0e0',borderWidth:1.5,backgroundColor:watch('strictMode')==='manual'?'#80ccff':'white'}} 
             
             className='w-[18px] h-[18px] rounded-full'></View>
              </Pressable> 
              <Text className='font-light text-base ml-2'>Manual</Text>
            </View>

            <View className='flex-row items-center'>
             <Pressable onPress={()=>{setValue('strictMode','shift')
             setValue('strictFullDay','00:00 hours')
             setValue('strictHalfDay','00:00 hours')

             }
             } >
             <View style={{borderColor:'#d1e0e0',borderWidth:1.5,backgroundColor:watch('strictMode')==='shift'?'#80ccff':'white'}} 
             className='w-[18px] h-[18px] rounded-full'></View>
              </Pressable> 
              <Text className='font-light text-base ml-2'>Shift</Text>
            </View>
          </View>
        }

        {
          watch('strictMode')==='manual' && isStrict && <View className='p-5'>
            <View>
            <Required text='Full Day'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.fullday} name='strictFullDay' placeholder='select time' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('strictFullDay')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
            

              </View>

              <View>
            <Required text='Half Day'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.half} name='strictHalfDay' placeholder='select time' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('strictHalfDay')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
            

              </View>
          </View>
        }

{
          watch('strictMode')==='shift' && <View className='m-5 rounded-xl bg-zinc-200'>
            <View className='p-5'>
            <Text>Full Day: total hours of shift assigned</Text>
              </View>

              <View className='p-5'>
              <Text>Half Day: half hours of shift assigned</Text>
              </View>
          </View>
        }


        {
          islenient && <View style={styles.optionsContainer}>
          <View className='flex-row items-center'>
           <Pressable onPress={()=>setValue('lenientMode','manual')} >
           <View 
           style={{borderColor:'#d1e0e0',borderWidth:1.5,backgroundColor:watch('lenientMode')==='manual'?'#80ccff':'white'}} 
           
           className='w-[18px] h-[18px] rounded-full'></View>
            </Pressable> 
            <Text className='font-light text-base ml-2'>Manual</Text>
          </View>

          <View className='flex-row items-center'>
           <Pressable onPress={()=>{setValue('lenientMode','shift')
           setValue('FullDay','00:00 hours')
           setValue('strictHalfDay','00:00 hours')
           setValue('lenietFullDay','00:00 hours')

           }
           } >
           <View style={{borderColor:'#d1e0e0',borderWidth:1.5,backgroundColor:watch('lenientMode')==='shift'?'#80ccff':'white'}} 
           className='w-[18px] h-[18px] rounded-full'></View>
            </Pressable> 
            <Text className='font-light text-base ml-2'>Shift</Text>
          </View>
        </View>
        }

        {
          watch('lenientMode') ==='manual' && islenient && 
          <View className='p-5'> 
            <Required text='Full Day'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.expectedHrs} name='lenientHours' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('lenientHours')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
          </View>



        }
        
        {watch('lenientMode') ==='shift' &&<View className='m-5 rounded-xl bg-zinc-200'>
          <View className='p-5'>
          <Text>Full Day: total hours of shift assigned</Text>
            </View>
        </View>
        }

      </View>
     
     <View className='p-5 flex-row items-center'>
     <Pressable onPress={()=>setValue('allowOvertimeDeviations',!allowdeviation)}>
        {allowdeviation ?<Ionicons name="checkbox" size={24} color="#80ccff" />
        
        :<Feather name="square" size={24} color="black" />
      }
      </Pressable>
      <Text className='ml-2 text-base'>Allow overtime and deviation</Text>
     </View>


     <View className='p-5 flex-row items-center'>
     <Pressable onPress={handleMaxHours}>
        {isMaxhours ?<Ionicons name="checkbox" size={24} color="#80ccff" />
        
        :<Feather name="square" size={24} color="black" />
      }
      </Pressable>
      <Text className='ml-2 text-base'>Set Maximum hours per day</Text>

    
     </View>

     {isMaxhours && <View className='p-5'> 
            <Required text='Maximum Hours'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control} rules={validationRules.maxHours} name='maxHours' placeholder='select time' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('maxHours')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
          </View>}

      <View>

        

      </View>
      </View>

      <View className='flex-row items-center justify-evenly'>
       <CustomButton text='save' width='30%' onPress={handleSubmit(handleSave)}/>
       <CustomButton text='reset' width='30%' onPress={()=>reset(data)} />
      </View>
      
      <DateTimePickerModal
        isVisible={isTimePickerVisible.show}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        locale="en_GB"
      />
    </ScrollView>
  )
}

export default AttendanceSettings

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 12,
      
    },
    title: {
      fontSize: 14,
      marginBottom: 16,
    },
    optionsContainer: {
      flexDirection: 'row',
      marginHorizontal:15,
      justifyContent: 'space-evenly',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      bottom:5,
      position:'relative'
    },
    checkboxLabel: {
      marginLeft: 8,
      fontSize: 14,
    },
  
})