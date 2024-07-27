import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Controller } from 'react-hook-form'
import { Pressable } from 'react-native'
import { Platform } from 'react-native'
import { TextInput } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"


const CustomDatePicker = ({control,name,placeholder,handleSetDate}) => {

const [date,setDate] =useState(new Date())
const [showPicker,setShowPicker] = useState(false)


const toggleDatePicker=()=>{
  setShowPicker(prev=> !prev)
}

const confirmIOSDate=()=>{
    handleSetDate(name,date.toDateString())
    toggleDatePicker()
  }
  
  const handleChange=({type},selectedDate)=>{
    if(type==='set'){
      const currentdate = selectedDate
      setDate(currentdate)
  
      if(Platform.OS === 'android'){
        toggleDatePicker()
        handleSetDate(name,currentdate.toDateString())
      }
    }
    else{
      toggleDatePicker()
    }
  }






  return (
    <View>
    {!showPicker &&<Pressable
        onPress={toggleDatePicker}
        >
          
         <Controller 
            control={control}
            name={name}
            render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
            <>
            <View style={[styles.container,{borderColor:error?'red' : '#e8e8e8'}]}>
            <TextInput 
            value={value}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="gray"
            editable={false}
            onPressIn = {toggleDatePicker}
            backgroundColor='white'
            textColor='black'
            
            />
            </View>
            
            
              {error &&
              <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
              </>
            }
            />
            </Pressable>}
  
        {showPicker && 
        <DateTimePicker
        mode='date'
        display='spinner'
        value={date}
        onChange={handleChange}
        textColor='black'
        />}
  
  {
    Platform.OS === 'ios' && showPicker && <View style={styles.pickerButtonContainer}>
  <TouchableOpacity style={[styles.pickerButton]} onPress={toggleDatePicker}>
    <Text style={styles.buttonText}>Cancel</Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={[styles.pickerButton]} onPress={confirmIOSDate}>
    <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity> 
  
  </View>
  }
    </View>
  )
}

export default CustomDatePicker

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        borderColor:'#e8e8e8',

        borderRadius:5,
        borderWidth:1,

        paddingHorizontal:10,
        marginVertical:10,
        paddingVertical:10,
        flexDirection:'row',
        gap:10,
        
    },
    
    pickerButtonContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:10,
      marginBottom:20
    },
    
    buttonText:{
      fontSize:16
    },
    
    pickerButton:{
    
    }
})