import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from  'react-native'
import Logo from '../../assets/logo1.webp'
import { useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {useForm} from 'react-hook-form'
import { FIREBASE_AUTH } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from 'expo-router'

const LogInScreen=()=>{
    
    const {height} = useWindowDimensions()
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null)
    const auth = FIREBASE_AUTH
    const navigation=useNavigation()

    const {control,handleSubmit,formState:{errors}} = useForm()


    const handleLogIn=async(data)=>{
        try{ 
            // console.log(data)
            setLoading(true)
            const response = await signInWithEmailAndPassword(auth,data.username,data.password)
            //navigation.navigate('Dashboard')
            setLoading(false)
            setError(false)
        }catch(error){
            
            setError(true)
            setLoading(false)
        }finally{

        }
    }


    return (
        <KeyboardAvoidingView style={styles.root} behavior="padding">
       {!loading ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageContainer}>
            <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/>
        </View>
        <View style={styles.formContainer}>
            <Text style={[styles.text,styles.welcomeText]}>Welcome!</Text>
            <Text style={styles.text}>It's great to have you on board.Please log in to access your account.</Text>
            {error &&<Text className='text-md text-red-800 relative right-3 mt-1'>Invalid email or password. Please check your credentials and try again.</Text>}
            <CustomInput 
            control={control} 
            rules={{required:'Username is required',}} 
            name='username' 
            placeholder='Username'
            />
            <CustomInput 
            control={control} 
            rules={{required:'Password is required',   
            minLength:{value:3 ,message:'Password should be minimum 3 characters long'}
            }} 
            name='password' 
            placeholder='Password' 
            secureTextEntry={true}/>
            
            <View className='self-end bottom-5'>
            <CustomButton text='Forgot password?' onPress={()=>navigation.navigate('ForgotPassword')} type='TERTIARY'/>
            </View>

            <CustomButton text='Log In' onPress={handleSubmit(handleLogIn)} />
    
            <View className='flex-row items-center justify-center'>
                <Text className='font-light text-base left-2'>Don't have an account?</Text>
                <CustomButton text='Sign Up' type='TERTIARY' width='10px' onPress={()=>navigation.navigate('SignUp')}/>
                
            </View>
            </View>
        </ScrollView>
         :(
        <View className="absolute h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
          <ActivityIndicator size="large" color="#0b99e6" />
          <Text className="mt-2 text-lg">Signing in...</Text>
        </View>
      )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
   
    },

    imageContainer:{
        alignItems:'center',
        flex:1
        
    },


    logo:{
        width:'80%',
        maxHeight:500,
        maxWidth:400
    },

    formContainer:{
        position:'relative',
        padding:20,
        backgroundColor:'#3385ff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        justifyContent:'flex-start',
        alignItems:'center',
        flex:10,

    },
    text:{
        color:'white',

    },

    welcomeText:{
        fontWeight:'600',
        fontSize:30,
        alignSelf:'flex-start',
        left:10

    }
})


export default LogInScreen 