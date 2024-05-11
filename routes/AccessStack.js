import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../src/screens/StartScreen/StartScreen';
import LogInScreen from '../src/screens/LogInScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../src/screens/ResetPasswordScreen';
import Dashboard from '../src/screens/Dashboard';
import ScreenHeaderButton from '../src/components/Header/ScreenHeaderButton';
import { icons } from '../src/constants';

const Stack = createStackNavigator();

const AccessStack=({user})=> {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={StartScreen} options={{
        headerTitle:""
      }}/>
      <Stack.Screen name="Login" component={LogInScreen} options={{
        headerTitle:""
      }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
      <Stack.Screen name="Dashboard" component={Dashboard} 
      
      options={{
        headerShown:false
        
        // headerStyle:{backgroundColor:'#3385ff'},
        // headerShadowVisible:false,
        // headerTitle:"",
        // headerLeft:()=>(
        //   <ScreenHeaderButton Icon={icons.Menu} size={30} color='white'/>
        // ),
        // headerRight:()=>(
        //   <ScreenHeaderButton Icon={icons.Person} size={40} color='white' />
        //   )

        
      }}
      
      
      
      />
    </Stack.Navigator>
  );
}

export default AccessStack