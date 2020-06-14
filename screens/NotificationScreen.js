import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';

import { MonoText } from '../components/StyledText';

export default function NotificationScreen(props) {
  return (
    <View style={styles.container}>
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
           Notifications
          </Text>
        </View>
        <TouchableOpacity 
        onPress = {() => { props.navigation.openDrawer() }} 
        style={styles.buttonStyle}> 
        <View style={styles.keepRow}>
          <MaterialCommunityIcons name="wrench" style={styles.buttonIcon} size={24} color="black" />
          <Text style={styles.buttonText} >
            Settings
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

NotificationScreen.navigationOptions = {
  header: null
};
