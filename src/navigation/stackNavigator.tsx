import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp } from "../screens/authStack";
import TabNavigator from "./tabNavigator";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { login } = useSelector<any, any>((store) => store.cookies);
  console.log(login,"login=========>")
  return (
    <Stack.Navigator
      initialRouteName={login ? "TabNavigator" :"SignIn" }
      screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal', }} >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      {/* <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="CallTabBar" component={CallTabBar} /> */}
     
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
export default StackNavigator;