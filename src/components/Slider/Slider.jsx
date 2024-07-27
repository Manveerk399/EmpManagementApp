import { View, Text, Dimensions, StyleSheet,FlatList, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';

const data = [
  { title: 'Shift Management', text: 'A shift management service to schedule, track, and manage employee shifts efficiently.',img:require('../../assets/work-schedule.png') },
  { title: 'Leave Tracker', text: 'A leave tracker which allows employees to request and track their leave status and balances easily.',img:require('../../assets/leave.png')},
  { title: 'Payroll', text: 'Payroll services to manage employee compensation, including calculating wages, taxes, and issuing payments.',img:require('../../assets/salary.png')},
  { title: 'Attendance', text: 'Attendance to track and record employee check-ins, check-outs, and overall presence.',img:require('../../assets/attendance.png')},
];

const { width: screenWidth,height:screenHeight } = Dimensions.get('screen');

export default function Slider() {

    const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.img} resizeMode='contain' style={styles.img}/>
      <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
    <Carousel
      data={data}
      renderItem={renderItem}
      width={screenWidth}
      height={screenHeight}
      onSnapToItem={(index) => setActiveIndex(index)}
      mode="parallax"
    />
  </View>
   
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    slide: {
      backgroundColor: 'white',
      borderRadius: 8,
      height:'80%',
      justifyContent:'center',
      alignItems: 'center',
      padding:20,
      borderColor:'red'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 16,
      marginTop: 10,
      textAlign:'center'
    },

    img:{
      width:screenWidth*0.6,
      height:screenHeight*0.5
     
    },
    content:{
     alignItems:'center',
     marginBottom:20
    }
  
  });