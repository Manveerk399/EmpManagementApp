import { StyleSheet, Text, View,FlatList} from 'react-native'
import React from 'react'
import { PageComp } from '../ManageAccount/Company/Company'
import { pages } from './pages'

const ShiftSettings = () => {

  const renderItem=({item})=>{
    return <PageComp item={item}/>
  }

  return (
    <View>
      <FlatList
        data={pages}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=>
          <View style={styles.separator}></View>
        }
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  )
}

export default ShiftSettings

const styles = StyleSheet.create({
  container:{
    
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc', // Color of the separator
  },
})