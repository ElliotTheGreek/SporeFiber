import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';
import { MonoText } from '../components/StyledText';

export default function MessagesScreen(props) {
  return (
    <View style={styles.container}>
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
            Messages go here
          </Text>
        </View>
    </View>
  );
}

MessagesScreen.navigationOptions = {
  header: null
};