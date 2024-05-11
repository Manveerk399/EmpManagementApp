import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'

export default function ScreenHeaderButton({Icon,size,onPress,color}) {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <Icon color={color} size={size} />
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


})