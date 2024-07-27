import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { MultiSelect } from 'react-native-element-dropdown';

const CustomMultiSelect = ({control,name,placeholder,options,rules}) => {


  return (
    <View  className='mt-2 mb-5'>
       <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
          <>
         <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={options}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onChange={onChange}
         
          selectedStyle={styles.selectedStyle}
          
        />
          
          
            {error &&
            <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
            </>
          }
          />
    </View>
  )
}

export default CustomMultiSelect


const styles = StyleSheet.create({
    input:{
        backgroundColor:'white',
        width:'100%',
        borderColor:'#e8e8e8',
    
        borderRadius:5,
        borderWidth:1,
    
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        gap:10,
        
    },
    container: {
      backgroundColor: 'white',
      padding: 16,
      
    },
    selectedStyle: {
        borderRadius: 12,
      },
    dropdown: {
      height: 35,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 13,
    },
    selectedTextStyle: {
      fontSize: 12,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 30,
      fontSize: 16,
    },
    
  

})


