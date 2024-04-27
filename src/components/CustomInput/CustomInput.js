import React from "react";
import { View,Text,TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const CustomInput=({control,rules={},name,placeholder,secureTextEntry=false})=>{

    const ICONSIZE=20
    const ICONCOLOR='gray'

    const Icon = name==='username' ?  <Feather name="user" size={ICONSIZE} color={ICONCOLOR} /> 
    :name==='password' ? <Feather name="lock" size={ICONSIZE} color={ICONCOLOR} />
    :name==='code'?<MaterialIcons name="lock-reset" size={ICONSIZE} color={ICONCOLOR} />
   : <></>


    
    return (
        

          <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
          <>
          <View style={[styles.container,{borderColor:error?'red' : '#e8e8e8'}]}>
         {Icon}
          <TextInput 
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={placeholder} 
          style={[styles.input,]} 
          secureTextEntry={secureTextEntry}
          placeholderTextColor="gray"
          />
          
            </View>
            {error &&
            <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
            </>
          }
          />
        
      
    )
}

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
    input:{
        fontSize:16,
        top:3
    }
})
export default CustomInput