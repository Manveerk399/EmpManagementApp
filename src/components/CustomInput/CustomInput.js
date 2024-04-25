import React from "react";
import { View,Text,TextInput } from "react-native";
import { StyleSheet } from "react-native";

const CustomInput=({placeholder,secureTextEntry=false})=>{
    return (
        <View style={styles.container}>
          <TextInput 
          placeholder={placeholder} 
          style={styles.input} 
          secureTextEntry={secureTextEntry}/>
        </View>
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
        paddingVertical:10
    },
    input:{}
})
export default CustomInput