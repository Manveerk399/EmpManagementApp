import React from "react"; 
import { SafeAreaView,StyleSheet,Text } from "react-native"; 
import 'react-native-gesture-handler';
import AccessStack from "../routes/AccessStack";
import { NavigationContainer } from "@react-navigation/native";


const App=()=>{
    return (
        <SafeAreaView style={styles.root}  >          
            <AccessStack/>          
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