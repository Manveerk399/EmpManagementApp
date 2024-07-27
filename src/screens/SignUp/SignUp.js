import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useForm } from 'react-hook-form'
import { useNavigation } from 'expo-router'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../firebase/config'
import { createDocument } from '../../firebase/firebaseActions'

const handleError=(error)=>{
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      default:
        errorMessage = error.message;
        break;
    }
  
    alert(`Error signing up: ${errorMessage}`);
  }
  


const SignUp = () => {
  const navigate = useNavigation()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  const {control,handleSubmit,formState:{errors}} = useForm() 

  const handleSignUp=async(data)=>{

    try {
      setLoading(true)
      let response = await createUserWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
      // console.log(response)

      // Set display name
      const displayName = `${data.firstname} ${data.lastname}`;
      await updateProfile(response.user, { displayName });

      const uid = response.user.uid;

      // Additional user info to be added to Firestore
      const userInfo = {
        uid: uid,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        fullname:displayName,
        specificrole:{value:'Super Administrator',label:'Super Administrator'},

      };
  
      // Add user info to Firestore using the reusable function
      await createDocument('users', userInfo);
      setLoading(false)
      navigate.navigate('RegisterComp')

    } catch (error) {
      
      handleError(error)
      setLoading(false)
    }
   

  }



  return (
    <View className='flex-1 p-7 bg-blue-500 gap-5'>
      <Text className='text-semibold text-2xl self-start'>Create your account</Text>
      
      <View className='items-center'>
        <CustomInput name='firstname' rules={{required:'firstname is required',}} control={control} placeholder='Firstname'/>
        <CustomInput name='lastname' rules={{required:'lastname is required',}} control={control} placeholder='Lastname'/> 
        <CustomInput name='email' control={control} rules={{required:'email is required',}} placeholder='Email Address'/>
        <CustomInput name='password'  rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password should be minimum 8 characters long'
          },
          validate: {
            containsNumber: (value) => /[0-9]/.test(value) || 'Password must contain at least 1 number',
            containsUpperCase: (value) => /[A-Z]/.test(value) || 'Password must contain at least 1 uppercase letter',
            containsSpecialChar: (value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value) || 'Password must contain at least 1 special character'
          }
        }}  control={control} placeholder='Password'/> 
        <CustomButton text={loading?'Signing in ...':'Sign Up'} width='90%' onPress={handleSubmit(handleSignUp)} />
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({})