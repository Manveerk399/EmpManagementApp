import { View, Text ,ScrollView,StyleSheet} from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import {LinearGradient} from 'expo-linear-gradient'
import {useForm} from 'react-hook-form'

const ResetPasswordScreen = ({navigation}) => {

  const {control,handleSubmit,formState:{errors}} = useForm()

  return (
    
        <LinearGradient
        colors={['#3385ff','#e6f0ff', '#e6f2ff']}
        style={styles.gradient}
      > 
        
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput 
        name='code'
        control={control}
        placeholder='Enter the confirmation code'
        />

       <CustomInput 
       control={control}
       name='password'
        placeholder='Enter your new password'
        />

        <CustomButton text='Submit' onPress={()=>navigation.navigate('Login')}  />

        <CustomButton text='Back to Log In' onPress={()=>navigation.navigate('Login')} type='TERTIARY'/>
      
        </LinearGradient>
   
  )
}


const styles = StyleSheet.create({
   
    gradient: {
        flex: 1,
        padding:20,
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

export default ResetPasswordScreen
