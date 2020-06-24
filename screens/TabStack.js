import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, Appbar, Avatar, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles.js';
import FeedScreen from './FeedScreen';
import NewPostScreen from './NewPostScreen';
import NetworkScreen from './NetworkScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';
import NotificationScreen from './NotificationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// These are the main top level tabbed pages
export default function TabStack(props) {

  return (
    <Tab.Navigator
      initialRouteName="FeedScreen"
      headerMode="screen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'beaker' : 'beaker-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'book-open' : 'book-open-outline';
          } else if (route.name === 'Network') {
            iconName = focused ? 'account-network' : 'account-network-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell-alert' : 'bell-alert-outline';
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#9fc5e8',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        goat="cheese"
        options={{ headerTitle: 'FeedScreen' }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ headerTitle: 'MessagesScreen' }}
      />
      <Tab.Screen
        name="Network"
        component={NetworkScreen}
        options={{ headerTitle: 'NetworkScreen' }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ headerTitle: 'NotificationScreen' }}
      />
    </Tab.Navigator>
  );
}

TabStack.navigationOptions = {
  header: null
};