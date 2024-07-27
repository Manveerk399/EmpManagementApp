import React, { useState } from "react";
import { View,Text,TextInput,TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Controller } from 'react-hook-form'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomDropdownPicker } from "../CustomSelect/CustomSelect";



const CustomDocPicker=({control,rules={},name})=>{
    
  



    
    return (
        

          <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
          <>
         </>
          }
          />
        
      
    )
}

const styles = StyleSheet.create({
    
})
export default CustomDropdownPicker