import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';

import { MonoText } from '../components/StyledText';

export default function ProfileSetupScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.keepRow}>
        <Text style={styles.buttonText} >
         Your profile isn't setup
        </Text>
      </View>

      <TouchableOpacity
      onPress={() => { props.navigation.jumpTo('ProfileScreen') }}
      style={styles.buttonStyle}> 
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
            Setup your profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

ProfileSetupScreen.navigationOptions = {
  header: true
};
