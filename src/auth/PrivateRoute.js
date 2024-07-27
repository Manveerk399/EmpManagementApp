import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigation } from 'expo-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  const navigation = useNavigation()
  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    navigation.navigate('/Login');
    return null;
  }

  return children;
};

export default PrivateRoute;
