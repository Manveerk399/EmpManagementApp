import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { SelectList } from 'react-native-dropdown-select-list'
import MultiSelect from 'react-native-multiple-select'
import { Dropdown } from 'react-native-element-dropdown';


const CustomSelect = ({control,name,placeholder,options,rules}) => {

  const [isFocus, setIsFocus] = useState(false);


  // console.log('in select',name,options)
  
  return (
    <View  className='mt-2 mb-5'>
       <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error}}) => 
          <>
        {/* {console.log('select value',value)}
          <SelectList 
          value={value}
          onBlur={onBlur}
          setSelected={onChange}
          placeholder={placeholder}
          data={options}
          boxStyles={[styles.input]}
          save='value'

          
          /> */}
           <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChange}
        />
          
          
            {error &&
            <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
            </>
          }
          />
    </View>
  )
}

export default CustomSelect




export const CustomDropdownPicker = ({control,name,placeholder,options,setSelected,rules}) => {

  

  

  return (
    <View>
       <Controller 
          control={control}
          name={name}
          rules={rules}
          render={({field:{onBlur,onChange,value},fieldState:{error},setValue}) => 
          <>
           <MultiSelect
        items={options}
        uniqueKey="key"
        onSelectedItemsChange={(selected) =>setSelected(name,selected)}
        selectedItems={value}
        selectText={placeholder}
        searchInputPlaceholderText="Search Items..."
        // onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="value"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
       
      />
         
        
      
            {error &&
            <Text style={{color:'red',alignSelf:'stretch'}}>{error.message || 'Error'}</Text>}
            </>
          }
          />
    </View>
  )
}

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
      fontSize: 15,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

})


