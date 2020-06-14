import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';

import { MonoText } from '../components/StyledText';

export default function NetworkScreen(props) {
  const [connectionData, setConnectionData] = React.useState([]);

  let syncConnectionData = async () => {
    try {
      const _data = await AsyncStorage.getItem('ConnectionData');
      setConnectionData(JSON.parse(_data));
    } catch (error) {
      console.log(error);
    }
  };

  syncConnectionData();

  if (!connectionData || connectionData.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
            You have no connections
          </Text>
        </View>
        <TouchableOpacity 
          onPress = {() => { props.navigation.jumpTo('NewConnection') }} 
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <MaterialCommunityIcons name="account-plus" style={styles.buttonIcon} size={24} color="black" />
            <Text style={styles.buttonText} >
              Connect to someone new
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else {
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {
        connectionData.reverse().map((post, i) => (
          <Post post={post} key={i} />
        ))
      }
      </ScrollView>
      <TouchableOpacity 
        onPress = {() => { props.navigation.jumpTo('NewConnection') }} 
        style={styles.buttonStyle}> 
        <View style={styles.keepRow}>
          <MaterialCommunityIcons name="account-plus" style={styles.buttonIcon} size={24} color="black" />
          <Text style={styles.buttonText} >
            Connect to someone new
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
    );
  }
}

NetworkScreen.navigationOptions = {
  header: true
};