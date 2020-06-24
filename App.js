import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { DefaultTheme, Appbar, Avatar, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SideBarScreen from './screens/SideBarScreen';
import TabStack from './screens/TabStack';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewPostScreen from './screens/NewPostScreen';
import NewConnectionScreen from './screens/NewConnectionScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import Server from './screens/Server';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const Drawer = createDrawerNavigator();


  if (!isLoadingComplete) {
    return null;
  } else {
    Server.appStart();
    const theme = {
      ...DefaultTheme,
      roundness: 2,
      colors: {
        ...DefaultTheme.colors,
        primary: '#f5f6f7',
        accent: '#f1c40f',
      },
    };
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator 
            drawerContent={ props => <SideBarScreen server={Server} {...props} />}
            initialRouteName="TabStack"
          >
            <Drawer.Screen name="TabStack" server={Server} component={TabStack} />
            {/* Stand alone components and pages below */}
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            <Drawer.Screen name="NewPost" component={NewPostScreen} />
            <Drawer.Screen name="NewConnection" component={NewConnectionScreen} />
            <Drawer.Screen name="PreferencesScreen" component={PreferencesScreen} />

          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
