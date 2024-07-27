import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'

export default function ScreenHeaderButton({Icon,text='',textOnly=false,size,onPress,color}) {

  const backgroundColor= textOnly ? styles.textOnlyStyle :{}
  return (
    <TouchableOpacity style={[styles.btnContainer,backgroundColor]} onPress={onPress} >
        {!textOnly &&<Icon color={color} size={size} />}
        {textOnly && <Text className='text-base font-bold'>{text}</Text>}
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  btnContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  textOnlyStyle:{
    backgroundColor:'#e0e0eb',
    borderRadius:'100%',
    marginRight:3
  }


})