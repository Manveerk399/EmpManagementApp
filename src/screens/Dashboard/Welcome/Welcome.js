import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeaderButton from '../../../components/Header/ScreenHeaderButton'
import { icons } from '../../../constants'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigation } from 'expo-router'


export const abbreviateFullName = (fullName) => {
  // Split the full name by spaces
  const nameParts = fullName?.trim().split(' ');

  // Take only the first two parts
  const relevantParts = nameParts?.slice(0, 2);

  // Map the parts to their first characters and join them together
  const initials = relevantParts?.map(part => part.charAt(0).toUpperCase()).join('');

  return initials;
};

const Welcome = () => {

  const navigate = useNavigation()
  const {profile,user,shift} = useAuthContext()
  
  console.log('profile',profile)

  return (
    <View style={styles.root}>
     <View style={styles.userContainer}>
      <ScreenHeaderButton textOnly={true} text={abbreviateFullName(profile?.fullname)} color='white' size={45} onPress={()=>navigate.openDrawer()}/>
      <View style={styles.userDetails}>
        <Text style={styles.name}>{profile?.fullname}</Text>
        <Text style={styles.role}>{profile?.specificrole?.label}</Text>
      </View>
     </View>
   
    {/* <ScreenHeaderButton Icon={icons.Notifcation} color='white' size={30}/> */}
  
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    root:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#3385ff',
        padding:10,
        alignItems:'center',
      
    },

    userContainer:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    userContainer:{
        flexDirection:'row',
        alignItems:'center'
        
    },

    name:{
        color:'white',
        fontWeight:'900'
    },

    role:{
        color:'white',
        marginLeft:2
    },

    
 
})