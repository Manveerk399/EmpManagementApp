import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../src/screens/StartScreen/StartScreen';
import LogInScreen from '../src/screens/LogInScreen';
import ForgotPasswordScreen from '../src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../src/screens/ResetPasswordScreen';

const Stack = createStackNavigator();

const AccessStack=()=> {
  return (
    <Stack.Navigator  screenOptions={{
        headerShown: false, // Hide the header
      }}>
      <Stack.Screen name="Home" component={StartScreen} />
      <Stack.Screen name="Login" component={LogInScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

export default AccessStack