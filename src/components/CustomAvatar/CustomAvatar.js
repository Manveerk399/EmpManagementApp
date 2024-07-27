import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';



const CustomAvatar = ({size , imgSrc}) => {


  return (
    <Avatar.Image size={size} source={imgSrc} />
  )
}

export default CustomAvatar

const styles = StyleSheet.create({})