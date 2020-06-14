import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { AsyncStorage, Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';
import { MonoText } from '../components/StyledText';
import moment from "moment";
export default function Post(props) {
  const [feedData, setFeedData] = React.useState([]);
  let syncFeedData = async () => {
    try {
      const _feed = await AsyncStorage.getItem('FeedData');
      setFeedData(_feed);
    } catch (error) {
      console.log(error);
    }
  };

  syncFeedData();

  const [username, setUsername] = React.useState("");

  let loadUsername = async () => {
    try {
      const _username = await AsyncStorage.getItem('username');
      setUsername(_username);
    } catch (error) {
      console.log(error);
    }
  };

  loadUsername();

  let removePost = async () => {
    var oldPosts = [];
    if (feedData != null) {
      oldPosts = JSON.parse(feedData);
    }
    var newPosts = [];
    for (var i = oldPosts.length - 1; i >= 0; i--) {
      if (oldPosts[i].id != props.post.id) {
        newPosts.push(oldPosts[i]);
      }
    }

    try {
      await AsyncStorage.setItem('FeedData', JSON.stringify(newPosts));
    } catch (error) {
      console.log(error);
    }
  }

  let postTime = () => {

  }

  return (
    <View style={styles.post}>
      <View style={styles.centerContainer}>
      <Text>{username}</Text>
          <Text style={styles.postText}>
          {props.post.content}
          </Text>
      </View>
      <View style={styles.keepRow}>
        <TouchableOpacity 
          onPress = {() => {
              Alert.alert(
                "Delete Post?",
                "This cannot be undone",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () =>  { removePost() } }
                ],
                { cancelable: false }
              )
            }}
          style={styles.smallButton}> 
          <MaterialCommunityIcons name="delete-forever" size={24} />

        </TouchableOpacity>
        <Text style={styles.small} >
          {moment(props.post.posted_at).fromNow()}
        </Text>
      </View>
    </View>
  );
}
