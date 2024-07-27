import React, { useEffect, useState } from "react"; 
import { SafeAreaView,StyleSheet,Text } from "react-native"; 
import 'react-native-gesture-handler';
import AccessStack, { AdminPageStack } from "../routes/AccessStack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../src/firebase/config";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "../src/context/AuthContext";
import { StatusBar } from 'react-native';
import 'react-native-reanimated'
import 'react-native-gesture-handler';
import { MyDrawer } from "./drawer";
import { MyStack } from "./_layout";

const App=()=>{

        StatusBar.setBarStyle('dark-content');


    return (
        <SafeAreaView style={styles.root}  > 
       <StatusBar barStyle="dark-content" backgroundColor="white" />
        <PaperProvider>
            <AuthProvider> 
            
            <MyDrawer />
          
       
            </AuthProvider>  
            </PaperProvider>         
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    root:{
        flex:1,
        // backgroundColor:'white'
    },
})

export default App;