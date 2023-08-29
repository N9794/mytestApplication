import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackNavigator from './stackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  const dispatch = useDispatch()
 
  return (
    <Stack.Navigator
      initialRouteName={'StackNavigator'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StackNavigator" component={StackNavigator} />
    </Stack.Navigator>
  );
};
export default RootNavigation;