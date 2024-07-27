import { Pressable, StyleSheet, Text, View} from 'react-native'
import React, { useState } from 'react'
import { shadowstyles } from '../../../components/MenuCard/MenuCard'
import CustomAvatar from '../../../components/CustomAvatar/CustomAvatar'
import logo from '../../../assets/logo.png'

const AttendanceCard = ({clockIn , clockOut ,date,item}) => {

  const [showDetails,setShowDetails]=useState(false)
  return (
    <View style={[styles.card,shadowstyles.shadowStyle]}>
     <View className='p-4 rounded-full bg-green-300 self-start'>
          <Text>YK</Text>
        </View>
     <View>
     <View className='items-center p-1 bg-zinc-200 rounded-lg'>
        <Text className="font-semibold">{item.status}</Text>
    </View>
     <View style={styles.details}>
        <View style={styles.inner}>
            <Text className='font-semibold'>Check-in</Text>
            <Text className='font-light'>{clockIn}</Text>
             
        </View>
        <View style={styles.inner}>
            <Text className='font-semibold'>Check-out</Text>
            <Text className='font-light'>{clockOut}</Text>
        </View>

        

     </View>

     {showDetails ?
     <>
     <View style={styles.details}>
        <View style={styles.inner}>
            <Text className='font-semibold'>Worked Hours</Text>
            <Text className='font-light'>{item.workedHours}</Text>
             
        </View>
        <View style={styles.inner}>
            <Text className='font-semibold'>Payable Hours</Text>
            <Text className='font-light'>{item.payableHours}</Text>
        </View>

        

     </View>

     <View style={styles.details}>
        <View style={styles.inner}>
            <Text className='font-semibold'>Overtime(Hrs)</Text>
            <Text className='font-light'>{item.overtime}</Text>
             
        </View>
        <View style={styles.inner}>
            <Text className='font-semibold'>Deviation(Hrs)</Text>
            <Text className='font-light'>{item.deviation}</Text>
        </View>

     

        

     </View>

     <Pressable className='mt-2' onPress={()=>setShowDetails(!showDetails)}>
        <Text className='text-blue-400'>Show less</Text>
      </Pressable>


     
     
     </>:
      <Pressable className='mt-2' onPress={()=>setShowDetails(!showDetails)}>
        <Text className='text-blue-400'>Show More</Text>
      </Pressable>
     
     }
     </View>
     
    </View>
  )
}

export default AttendanceCard

const styles = StyleSheet.create({
    card:{
    flex: 1,
    marginHorizontal: 5,
    marginTop: 24,
    padding: 20,
    backgroundColor: 'white',
    fontSize: 24,
    borderRadius:15,
    flexDirection:'row',
    gap:30,
    //justifyContent:'center',
    position:'relative'




    },

    details:{
        flex:1,
        flexDirection:'row',
        gap:30,
        marginTop:5
    },

    in:{
        marginBottom:5
    },

    inText:{
        color:'#00cc44',
       

    },

    outText:{
        color:'#ff4d4d',
       

    },

    date:{
        position:'absolute',
        top:8,
        right:15

        
    }







})