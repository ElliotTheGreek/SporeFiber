import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';

import { MonoText } from '../components/StyledText';

export default function ProfileScreen(props) {
  const [name, setName] = React.useState(" ");
  const [loading, setLoading] = React.useState(true);
  const [username, setUsername] = React.useState({});

  let saveName = async (username) => {
    try {
      await AsyncStorage.setItem('username', username);
      props.navigation.goBack();
      props.navigation.openDrawer();
    } catch (error) {
      console.log(error);
    }
    console.log("Saved name:" + username);
  };

  let syncUsername = async () => {
    try {
      const _username = await AsyncStorage.getItem('username');
      if (!_username) {
        _username = "Unknown Human";
      }
      setUsername(_username);
      setLoading(true);
      if (name == null || name == " ") {
        setName(_username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  syncUsername();

  return (
    <View style={styles.container}>
          <View style={styles.centerContainer}>

            <Text>
              <Text style={{ fontSize: 24 }}>
              What's your name?
              </Text>
            </Text>
            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Display Name"
              placeholderTextColor = "#ababab"
              autoCapitalize = "none"
              onChangeText = {setName}
              value={name}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
          onPress={() => { saveName(name) }}
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <Text style={styles.buttonText} >
              Save
            </Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity
          onPress={() => { props.navigation.goBack(); }}
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <Text style={styles.buttonText} >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  header: true
};