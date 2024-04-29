import React, { useEffect, useState } from "react"; 
import { SafeAreaView,StyleSheet,Text } from "react-native"; 
import 'react-native-gesture-handler';
import AccessStack from "../routes/AccessStack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebase/config";


const App=()=>{

    const [user,setUser] = useState(null)


   useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH,(user)=>{
        console.log('user',user)
        setUser(user)
    })
   },[])





    return (
        <SafeAreaView style={styles.root}  >          
            <AccessStack user={user}/>          
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'white'
    },
})

export default App;