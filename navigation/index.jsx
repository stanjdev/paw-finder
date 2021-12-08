import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';

export default function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};


import MySplashScreen from '../screens/MySplashScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import MainSwipeScreen from '../screens/MainSwipeScreen';
import DogProfile from '../components/DogProfile';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="MySplashScreen" component={MySplashScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="AddHabitScreen" component={AddHabitScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="MainSwipeScreen" component={MainSwipeScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="DogProfile" component={DogProfile} />
    </Stack.Navigator>
  )
};