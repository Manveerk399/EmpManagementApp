import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';


const Menu=({color,size})=>{
return <Ionicons name="menu-outline" size={size} color={color} />
}

const Person=({color,size})=>{
    return <Ionicons name="person-circle-sharp" size={size} color={color} />

}

const Notifcation=({color,size})=>{
    return <MaterialCommunityIcons name="bell-circle" size={size} color={color} />
}

const Calendar=({color,size})=>{
    return <Feather name="calendar" size={size} color={color}/>
}


const Clock=({color,size})=>{
    return <Feather name="clock" size={size} color={color}/>
}


const LogIn=({color,size})=>{
    return <Entypo name="login" size={size} color={color} style={styles.icon}/>
}

const LogOut=({color,size})=>{
    return <Entypo name="logout" size={size} color={color} style={styles.icon} />
}

const Leave=()=>{

    
    return <MaterialCommunityIcons name="calendar-refresh-outline" size={16} color='black' />
}







const styles = StyleSheet.create({
    icon:{
        padding:0
    }


})

export default{
    Menu,
    Person,
    Notifcation,
    Calendar,
    Clock,
    LogIn,
    LogOut,
    Leave
}