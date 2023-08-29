import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { Calender, ContactList, Home, Members, Messaging, Recents } from '../screens/mainStack';
import { calendar } from '../utils/imageConst';
import CallTabBar from './callTabBar';
import DrawerIcon from '../customComponent/drawerIcon';
import { setDrawer } from '../redux/reducer';
import DrawerSideBar from './drawerSideBar';
import MeetingsList from '../screens/mainStack/meetingsList';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const dispatch = useDispatch()
  const { orientation, drawer } = useSelector<any, any>((store) => store.sliceReducer);

  useEffect(() => {

    dispatch(setDrawer(true))
  }, [])

  const isPortrait = orientation === 'PORTRAIT';
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      screenOptions={() => ({
        headerShown: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: '#012B73',
        drawerItemStyle: { height: 50, justifyContent: 'flex-start', left: 5, width: 50, marginTop: 50, borderRadius: 10 },
        drawerHideOnKeyboard: true,

        drawerStyle: {
          height: '100%', width: '20%'
        },
        drawerActiveTintColor: '#012B73',
      })}
      // drawerContent={props => <DrawerSideBar {...props} />}
    >
      {/* <Drawer.Screen
        options={{
          // drawerActiveTintColor: 'white',
          drawerItemStyle: { backgroundColor: 'white', marginTop: 20 },
          // drawerLabelStyle:{fontSize:12,fontWeight:'bold',lineHeight:16,left:-35,top:28,color:'white',width:80,},
          drawerIcon: ({ color, focused }) => (
            <DrawerIcon />
          ),
        }}
        name="Naveen"
        component={Home}
      />
      <Drawer.Screen

        options={{

          drawerLabel: 'Home',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -51, top: 18, color: '#012B73', width: 80, },
          drawerInactiveTintColor: 'red',
          // drawerIcon: ({ color, focused }) => (
          //   <Image
          //     source={require('../assets/images/element-3.png')}
          //     style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
          //   />
          // ),
        }}
        name="Home"
        component={Home}
      /> */}

      {/* <Drawer.Screen
        options={{
          drawerLabel: 'Video',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -58, top: 18, color: '#012B73', width: 80 },
          // drawerIcon: ({ color, focused }) => (
          //   <Image
          //     source={calendar}
          //     style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
          //   />
          // ),
        }}
        name="MeetingsList" component={MeetingsList} />

      <Drawer.Screen
        options={{
          drawerLabel: 'Chat',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -50, top: 18, color: '#012B73', width: 80 },
          drawerIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/messagenew.png")}
              style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
            />
          ),
        }}
        name="Messaging" component={Messaging} />
      <Drawer.Screen
        options={{
          drawerLabel: 'Call',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -48, top: 18, color: '#012B73', width: 80 },
          drawerIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/callnew.png")}
              style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
            />
          ),
        }}
        name="Call" component={CallTabBar} />
      <Drawer.Screen
        options={{
          drawerLabel: 'Members',
          drawerActiveTintColor: '#012B73',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -58, top: 18, color: '#012B73', width: 80 },
          drawerIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/user-square.png")}
              style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
            />
          ),
        }}
        name="Members" component={Members} />
      <Drawer.Screen
        options={{
          drawerLabel: 'Calender',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: { fontSize: 8, fontWeight: 'bold', lineHeight: 16, left: -58, top: 18, color: '#012B73', width: 80 },
          drawerIcon: ({ color, focused }) => (
            <Image
              source={calendar}
              style={{ tintColor: focused ? 'white' : '#012B73', height: 25, width: 25, left: 5, marginTop: 1 }}
            />
          ),
        }}
        name="Calender" component={Calender} /> */}


    </Drawer.Navigator>
  );
};
export default DrawerNavigator;