import React, { useState } from "react";
import { View,Text,TextInput,TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const CustomInput=({control,rules={},name,placeholder,secureTextEntry=false,multiline=false,isRequired=true,editable=true,numOfLines})=>{
    
  const[securetxt,setSecuretxt]=useState(secureTextEntry)
    const ICONSIZE=22
    const ICONCOLOR='gray'

    const Icon = name==='username' ?  <Feather name="user" size={ICONSIZE} color={ICONCOLOR} /> 
    :name==='password' ? <Feather name="lock" size={ICONSIZE} color={ICONCOLOR} />
    :name==='code'?<MaterialIcons name="lock-reset" size={ICONSIZE} color={ICONCOLOR} />
   : <></>


   const handleSecureText=()=>{
    setSecuretxt(prev => !prev)
   }

    
    return (
        

          <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
          <>
          <View style={[styles.container,{borderRadius:multiline? 10 :100},{borderColor:error?'red' : '#e8e8e8',borderWidth:2}]}>
         {Icon}
          <TextInput 
          value={value}
          onChangeText={onChange}
          editable={editable}
          // onBlur={onBlur}
          placeholder={placeholder} 
          style={multiline?[styles.input,styles.textArea]:[styles.input]} 
          secureTextEntry={securetxt}
          placeholderTextColor="gray"
          multiline={multiline}
          numberOfLines={numOfLines}

          />
          {name==='password'&&<TouchableOpacity
            onPress={handleSecureText}
          >
            <Feather name={securetxt ? 'eye' :'eye-off' } size={20} color={ICONCOLOR} />
          </TouchableOpacity>}
          
            </View>
            {error &&
            <Text style={{alignSelf:'stretch',marginLeft:10,position:'relative',bottom:5}} className='text-red-500'>{error.message || 'Error'}</Text>}
            </>
          }
          />
        
      
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor:'#e8e8e8',
        borderWidth: 1,
        // borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'center',
        padding: 12,
        marginVertical: 10,
        backgroundColor:'white',
        
    },
    input:{
      flex: 1,
      paddingHorizontal: 10,
      fontSize:16
      
    },
    textArea: {
      height: 100, // Adjust height as needed
      textAlignVertical: 'top', // Align text to the top of the TextInput
    },
})
export default CustomInput