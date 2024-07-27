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
    <TouchableOpacity className='flex items-start p-3 bg-neutral-100 rounded-2xl' onPress={()=>onPress({index:index,...info})}  onLongPress={()=>onLongPress(info)}>
         <Pressable onPress={()=>handleDelete(index)} className='self-end'><AntDesign name="delete" size={20} color="black" /></Pressable>
        <View className='flex-row items-center'>
        <FontAwesome name="institution" size={16} color="black" />
        <Text className='text-base ml-2'>{info?.institutename}</Text>
        </View>
        <View className='flex-1 w-full mt-3'>
          <View className='flex-row mb-3 items-center'>
            <FontAwesome name="graduation-cap" size={16} color="black" />
            <Text className='text-base ml-2'>{info.degree}</Text>
            </View>
            <Text className='font-medium text-slate-400 mb-2'>Date of Completion: {info.dateofcompletion}</Text>
        </View>
     
    </TouchableOpacity>
  )
}

export default function EducationalDetails({timeModalActions,mainFormFunction}) {

  
  const { control, handleSubmit,setValue,reset,formState: { errors }, watch } = useForm({
    defaultValues:{
      institutename:'',
      degree:'',
      dateofcompletion:''
    }
  })
  const{isTimePickerVisible,hideTimePicker,showTimePicker} = timeModalActions
  const{setMainFunc,mainValue} = mainFormFunction
  const [show,setShow]=useState(false)
  const [list,setList]=useState(mainValue('education'))
  const [edit,setEditing]=useState(false)

  const handleConfirm = (date) => {
    console.log('date',date)
  
    setValue('dateofcompletion',convertToDateFormat(date))
    
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
    setMainFunc('education',newlist)

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

      }


    else {setList(prev=>[data,...prev])

    setMainFunc('education',[data,...list])

   
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
      <CustomInput name="institutename" control={control} rules={{required:'Institute name is required'}} placeholder='Institute Name'/>
      <CustomInput name="degree" control={control}  rules={{required:'Degree name is required'}} placeholder='Degree'/>
            <View className='flex-row'>
            <View className='w-[200px]'><CustomInput control={control}  name='dateofcompletion' placeholder='select date' editable={false}/></View>
            <Pressable onPress={()=>showTimePicker('dateofcompletion')}  className='flex-1 justify-center ml-3'>
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