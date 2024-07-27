import { StyleSheet, Text, View,Pressable,FlatList ,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../../../components/CustomInput/CustomInput'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { useForm } from 'react-hook-form'
import { EvilIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { convertToDateFormat } from '../../../../utility/getDate'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Card = ({info,onLongPress,onPress,index,handleDelete}) => {
  return (
    <TouchableOpacity className='flex items-start p-3 bg-neutral-100 rounded-2xl' onPress={()=>onPress({index:index,...info})} onLongPress={()=>onLongPress(info)}>
        <Pressable onPress={()=>handleDelete(index)} className='self-end'><AntDesign name="delete" size={20} color="black" /></Pressable>
        <View className='flex-row items-center'>
        <FontAwesome name="building-o" size={16} color="black" />
        <Text className='text-base ml-2'>{info?.company}</Text>
        </View>
        <View className='flex-1 w-full mt-3'>
          <View className='flex-row mb-3 items-center'>
            {/* <FontAwesome name="graduation-cap" size={16} color="black" /> */}
            <Text className='text-base'>{info?.jobtitle}</Text>
            </View>
            <Text className='font-medium text-slate-400 mb-2'>Date: {info?.from} - {info?.to}</Text>
        </View>
     
    </TouchableOpacity>
  )
}

export default function WorkExperience({timeModalActions,mainFormFunction}) {

  
  const { control, handleSubmit,setValue,reset,formState: { errors }, watch } = useForm({
    defaultValues:{
      company:'',
      jobtitle:'',
      from:'',
      to:''
    }
  })
  const{isTimePickerVisible,hideTimePicker,showTimePicker} = timeModalActions
  const{setMainFunc,mainValue} = mainFormFunction
  const [show,setShow]=useState(false)
  const [list,setList]=useState(mainValue('workexperience'))
  const [edit,setEditing]=useState(false)

  const handleConfirm = (date) => {
    // console.log('date',date)
  
    setValue(isTimePickerVisible.name,convertToDateFormat(date))
    
    hideTimePicker();
  };

  const onPress=(item)=>{
    setShow(true)
    setEditing(true)
    reset(item)
  }

  const handleDelete=(index)=>{

    const newlist = list.filter((item, i) => (i !== index))
    setList(newlist)
    setMainFunc('workexperience',newlist)

  }


  const renderItem=({item,index})=>(
    <Card info={item} onPress={onPress} index={index} handleDelete={handleDelete}/>
  )


  
  

  const handleSave=(data)=>{

    if(show){

    if(edit){

    const newlist =list.map((item, i) => (i === data.index ? data : item))


    
    setList(newlist)
    setMainFunc('workexperience',newlist)
    setEditing(false)
    
    }else{
      setList(prev=>[data,...prev])

      setMainFunc('workexperience',[data,...list])
  
      reset()
      setShow(false)

    }
    reset()
    setShow(false)
}else{
  setShow(true)
}

  }

 
  
const Separator = () => (
  <View style={{height:10}} />
);

  return (
    <View className='flex-1'>
      <View style={{borderBottomColor:'black',borderBottomWidth:'2px',marginBottom:10}}>
      <View className='flex-row justify-end m-3'>
        <Pressable className='p-2 rounded-xl bg-sky-300 w-[100px]' onPress={handleSubmit(handleSave)}>
          <Text className='text-xs text-center'>{show && !edit?'Add':edit?'Save':'Open Form'}</Text>
        </Pressable>

       {show && <Pressable className='p-2 ml-2 rounded-xl bg-sky-300 w-[100px]' onPress={()=>{
        reset()
        setShow(false)
       }}>
          <Text className='text-xs text-center'>Hide</Text>
        </Pressable>}
      </View>
      {show&&<View>
      <CustomInput name="company" control={control} rules={{required:'Company name is required'}} placeholder='Company Name'/>
      <CustomInput name="jobtitle" control={control}  rules={{required:'Job Title is required'}} placeholder='Job title'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control}  name='from' placeholder='from' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('from')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>

            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control}  name='to' placeholder='to' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('to')}  className='flex-1 justify-center ml-3'>
            <EvilIcons name="calendar" size={35} color="black" />
            </Pressable>
            </View>
            </View>}
       </View>
{/* <View className='flex-1 mt-3'> */}
        <FlatList
        data={list}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        // keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        
  />
  {/* </View> */}
      <DateTimePickerModal
          isVisible={isTimePickerVisible.show}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
    </View>
  )
}

const styles = StyleSheet.create({})