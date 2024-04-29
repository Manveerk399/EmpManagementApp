import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from  'react-native'
import Logo from '../../../assets/logo1.webp'
import { useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import {useForm} from 'react-hook-form'
import { FIREBASE_AUTH } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'


const LogInScreen=({navigation})=>{

    const {height} = useWindowDimensions()
    const auth = FIREBASE_AUTH

    const {control,handleSubmit,formState:{errors}} = useForm()


    const handleLogIn=async(data)=>{
        console.log('data',data)
        try{
            const response = await signInWithEmailAndPassword(auth,data.username,data.password)
            console.log(response)
            navigation.navigate('Dashboard')
        }catch(error){
            console.log(error)
        }finally{

        }
    }


    return (
        <KeyboardAvoidingView style={styles.root} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                <TouchableOpacity style={{ flex: 1,margin:12}} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#3385ff" />
                </TouchableOpacity>
            </View>

        <View style={styles.imageContainer}>
            <Image source={Logo} style={[styles.logo,{height:height*0.3}]} resizeMode='contain'/>
        </View>
        <View style={styles.formContainer}>
            <Text style={[styles.text,styles.welcomeText]}>Welcome!</Text>
            <Text style={styles.text}>It's great to have you on board.Please log in to access your account.</Text>

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
            <CustomButton text='Log In' onPress={handleSubmit(handleLogIn)} />


            <CustomButton text='Forgot password?' onPress={()=>navigation.navigate('ForgotPassword')} type='TERTIARY'/>
            </View>
        </ScrollView>
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
        width:'100%',
        padding:20,
        backgroundColor:'#3385ff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        justifyContent:'flex-start',
        flex:1
    },
    text:{
        color:'white',

    },

    welcomeText:{
        fontWeight:'600',
        fontSize:30

    }
})


export default LogInScreen 