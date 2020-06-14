import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';
import Post from './Post';

import { MonoText } from '../components/StyledText';

export default function FeedScreen(props) {
  const [postList, setPostList] = React.useState([]);

  let syncFeedData = async () => {

    try {
      const _feed = await AsyncStorage.getItem('FeedData');
      setPostList(JSON.parse(_feed));
    } catch (error) {
      console.log(error);
    }
  };
  syncFeedData();

  if (!postList || postList.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
            You haven't posted anything yet.
          </Text>
        </View>
        <TouchableOpacity 
          onPress = {() => { props.navigation.jumpTo('NewPost') }} 
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <Text style={styles.buttonText} >
              Add something useful
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
        postList.reverse().map((post, i) => (
          <Post post={post} key={i} />
        ))
      }
      </ScrollView>
      <TouchableOpacity 
        onPress = {() => { props.navigation.jumpTo('NewPost') }} 
        style={styles.buttonStyle}> 
        <View style={styles.keepRow}>
          <Text style={styles.buttonText} >
            Add something useful
          </Text>
        </View>
      </TouchableOpacity>
      
    </SafeAreaView>
    );
  }
}

FeedScreen.navigationOptions = {
  header: null
};
