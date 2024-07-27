import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabViewExample from './Tab'

const Teams = ({navigation}) => {
  return (
    <View style={styles.container}>
      
      <TabViewExample navigation={navigation}/>
    </View>
  )
}

export default Teams

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})