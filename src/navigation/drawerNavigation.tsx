import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import {  NearestUser, Profile} from '../screens/mainStack';
import TabNavigator from './tabNavigator';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { setLogin, setLoginUser } from '../redux/cookiesReducer';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const dispatch = useDispatch()
  const navigation=useNavigation();
  //dhruv
 const Logout=()=>{
  dispatch(setLoginUser({}));
  dispatch(setLogin(false));
  navigation.navigate('SignIn')
 }
//dhruv

  
  return (
    <Drawer.Navigator
      initialRouteName={'Profile'}
      screenOptions={() => ({
        headerShown: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: '#012B73',
        drawerItemStyle: { height: 50, justifyContent: 'flex-start',
         left: 5, width: 50, marginTop: 50, borderRadius: 10 },
        drawerHideOnKeyboard: true,

        drawerStyle: {
          height: '100%', width: '60%',backgroundColor:'#ffffff'
        },
        drawerActiveTintColor: '#012B73',
      })}
      //dhruv
      drawerContent={props => <TouchableOpacity onPress={Logout} style={{borderWidth:1,borderColor:'red',backgroundColor:'#ffffff',position:'absolute',bottom:'10%',alignSelf:'center',width:'80%',borderRadius:15,paddingVertical:10}}><Text style={{fontSize:16,alignSelf:'center',fontWeight:'500',color:'red'}}>Logout</Text></TouchableOpacity>}
    //dhruv
    >
      
       <Drawer.Screen
        options={{
          drawerItemStyle: { backgroundColor: 'white', marginTop: 20 },
         
        }}
        name="TabNavigator"
        component={TabNavigator}
      />
      <Drawer.Screen

        options={{

          drawerLabel: 'NearestUser',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -51, top: 18, color: '#012B73', width: 80, },
          drawerInactiveTintColor: 'red',

        }}
        name="NearestUser"
        component={NearestUser}
      /> 
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;