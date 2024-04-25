import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../src/screens/StartScreen/StartScreen';
import LogInScreen from '../src/screens/LogInScreen';


const Stack = createStackNavigator();

const AccessStack=()=> {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false, // Hide the header
      }}>
      <Stack.Screen name="Home" component={StartScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
    </Stack.Navigator>
  );
}

export default AccessStack