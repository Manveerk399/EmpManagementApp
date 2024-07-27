import { StyleSheet, Text, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'


const statusFilter=[
    {id:'1',title:'All'},
    {id:'2',title:'Pending'},
    {id:'3',title:'Approved'},
    {id:'4',title:'Rejected'},
]
const StatusBar = () => {

const renderItem=(item)=>{

    return <TouchableOpacity>
        <View style={styles.buttonContainer}>
            <Text style={styles.text}>{item.title}</Text>

        </View>
    </TouchableOpacity>

}
  return (
    <View style={styles.container}>
       {/* <FlatList
        data={statusFilter}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.content}
      
      /> */}
      {
        statusFilter.map(status => renderItem(status))
      }
    </View>
  )
}

export default StatusBar

const styles = StyleSheet.create({
    container:{
       paddingHorizontal:10,
       marginBottom:20,
       flexDirection:'row'
       
    },

    buttonContainer:{
        backgroundColor:'white',
        marginLeft:10,
        padding:9,
        borderRadius:5,
        borderStyle:'solid',
        borderWidth:1.5,
        borderColor:'gray'
    },

   

    

 
})