import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from  'react-native'
import Logo from '../../../assets/logo1.webp'
import { useWindowDimensions } from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const LogInScreen=({navigation})=>{

    const {height} = useWindowDimensions()
    return (
        <KeyboardAvoidingView style={styles.root} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View>
                <TouchableOpacity style={{ flex: 1,margin:12}} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#3385ff" />
                </TouchableOpacity>
            </View>

        <View style={styles.imageContainer}>
            <Image source={Logo} style={[styles.logo,{height:height*0.4}]} resizeMode='contain'/>
        </View>
        <View style={styles.formContainer}>
            <Text style={[styles.text,styles.welcomeText]}>Welcome!</Text>
            <Text style={styles.text}>It's great to have you on board.Please log in to access your account.</Text>

            <CustomInput placeholder='Username'/>
            <CustomInput placeholder='Password' secureTextEntry={true}/>
            <CustomButton text='Log In' onPress={()=>console.warn('Pressing')} />


            <CustomButton text='Forgot password?' onPress={()=>console.warn('forgot password')} type='TERTIARY'/>
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