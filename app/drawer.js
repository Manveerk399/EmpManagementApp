import { createDrawerNavigator } from '@react-navigation/drawer';
import Attendance from '../src/screens/Attendance';
import AccessStack,{AdminPageStack, HomeStack} from '../routes/AccessStack';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '../src/screens/UserProfile/UserProfile';
import { MaterialIcons } from '@expo/vector-icons';
import AdminPage from '../src/screens/AdminPage/AdminPage';
import CustomDrawerContent from '../src/components/CustomDrawer/CustomDrawerContent';
import { useAuthContext } from '../src/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native-paper';
import { Text, View } from 'react-native';

const Drawer = createDrawerNavigator();



export const MyDrawer=()=> {

  const {user ,companyInfo,loading} = useAuthContext()

  // console.log('companyinfo',companyInfo,user)
  

 

  if(!companyInfo) return <AccessStack/>

  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={
      { headerShown: false ,
      drawerHideStatusBarOnOpen:true,
      drawerActiveTintColor:'#76a0db',
      drawerActiveBackgroundColor:'#d5e1f2',
      drawerLabelStyle:{marginLeft:-25}

    }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStack}

      options={{
        drawerLabel:'Home',
        drawerIcon:({size,color})=>(
          <AntDesign name="home" size={size} color={color} />
        )
      }}
       />
       <Drawer.Screen name="Profile" component={UserProfile}

options={{
  drawerLabel:'My Profile',
  drawerIcon:({size,color})=>(
    <Ionicons name="person" size={size} color={color}/>
  )
}}
 />
 <Drawer.Screen name="Admin Settings" component={AdminPageStack}

options={{
  headerShown:false,
  drawerLabel:'Admin Settings',
  drawerIcon:({size,color})=>(
    <MaterialIcons name="admin-panel-settings" size={size} color={color} />
  )
}}
 />
      {/* <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
    </Drawer.Navigator>
  );
}