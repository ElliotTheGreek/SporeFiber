import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';

import { MonoText } from '../components/StyledText';

export default function PreferencesScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text>
          <Text style={{ fontSize: 24 }}>
          Preferences
          </Text>
        </Text>
      </View>
    </View>
  );
}

PreferencesScreen.navigationOptions = {
  header: true
};