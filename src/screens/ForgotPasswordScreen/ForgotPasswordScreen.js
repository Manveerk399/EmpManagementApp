import { View, Text ,ScrollView,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import {LinearGradient} from 'expo-linear-gradient'
import { useForm } from 'react-hook-form'
import { sendPasswordResetEmail } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase/config'
import { ActivityIndicator } from 'react-native-paper'
import { Alert } from 'react-native'

const ForgotPasswordScreen = ({navigation}) => {

  const {control,handleSubmit,formState:{errors}} = useForm()
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(false)
  

  const handleReset=async(data)=>{

   try{
    setLoading(true)
    await sendPasswordResetEmail(FIREBASE_AUTH,data.username)
    Alert.alert('Success', 'Email Sent ! Please check you inbox.');
    setError(false)
    setLoading(false)
    
   }
   catch(error){
    console.log('error',error)
    setError(true)
    setLoading(false)
   }

  }

  return (
    
        <LinearGradient
        colors={['#3385ff','#e6f0ff', '#e6f2ff']}
        style={styles.gradient}
      > 
        <View className='p-5 flex-1 w-full items-center'>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
        control={control}
        name='username'
        placeholder='Username'
        />

        <CustomButton text='Send' onPress={handleSubmit(handleReset)} />

        <CustomButton text='Back to Log In' onPress={()=>navigation.navigate('Login')} type='TERTIARY'/>

        </View>

        {loading && (
        <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center p-0">
          <ActivityIndicator size="large" color="#0b99e6" />
          <Text className="mt-2 text-lg">Sending email...</Text>
        </View>
        
      )}
      
        </LinearGradient>
   
  )
}


const styles = StyleSheet.create({
   
    gradient: {
        flex: 1,
        // padding:20,
        alignItems:'center',
        width:'100%'
      },
    
    title:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        marginVertical:20
    }
})

export default ForgotPasswordScreen
