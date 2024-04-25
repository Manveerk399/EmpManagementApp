import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import StartImg from '../../../assets/getstart.jpg'
import { useWindowDimensions } from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';

const StartScreen = ({navigation}) => {
    const {height} = useWindowDimensions()
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#3385ff','#e6f0ff', '#e6f2ff']}
        style={styles.gradient}
      >
        <View style={styles.imgContainer}>
        <Image  source={StartImg} style={[styles.img]} />
        </View>
      

        <View style={styles.textContainer}>
        <Text style={[styles.text1]}>Welcome To EMP</Text>
        <Text style={styles.text2}>A workspace to manage your daily tasks and payroll.</Text>
        </View>
        

        <CustomButton text='Get Started' onPress={()=>navigation.navigate('Login')}/>


      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
      

        
    },
    gradient: {
        flex: 1,
        padding:20,
        alignItems:'center'
      },

    textContainer:{
        flex:1,
        justifyContent:'center'

    },

    text1:{
      fontSize:30,
      textAlign:'center',
      fontWeight:600

      },

      text2:{
        color:'grey',
        textAlign:'center',
        marginTop:10
  
        },
    img:{
        width: 300, 
        height: 300,
        borderRadius: 150,   
    },
    
    
})

export default StartScreen