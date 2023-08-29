import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { NearestUser, Profile } from '../screens/mainStack';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  //const {orientation}  = useSelector<any,any>((store) => store.sliceReducer);

  // console.log(orientation,'orientation=====>tab')
  // const isPortrait = orientation === 'PORTRAIT';
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // borderTopWidth: 5,
          height: '10%',
          paddingBottom:'5%',
        },
        tabBarActiveTintColor: '#012B73',
      })}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#012B73',
          tabBarLabelStyle:{fontSize:12,fontWeight:'500',lineHeight:16},
          // tabBarIcon: ({color, focused}) => (
          //   <Image
          //     source={require('../assets/images/element-3.png')}
          //     style={{tintColor: focused ? '#012B73' : 'grey',height:25,width:25}}
          //   />
          // ),
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen 
      options={{
        tabBarLabel: 'NearestUser',
        tabBarActiveTintColor: '#012B73',
        tabBarLabelStyle:{fontSize:12,fontWeight:'500',lineHeight:16},
        // tabBarIcon: ({color, focused}) => (
        //   <Image
        //     source={require("../assets/images/messagenew.png")}
        //     style={{tintColor: focused ? '#012B73' : 'grey',height:25,width:25}}
        //   />
        // ),
      }}
      name="NearestUser" component={NearestUser} />
      
      
     
    </Tab.Navigator>
  );
};

export default TabNavigator;
