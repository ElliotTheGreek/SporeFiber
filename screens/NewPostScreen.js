import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';
import { MonoText } from '../components/StyledText';

export default function NewPostScreen(props) {
  const [newPostContent, setNewPostContent] = React.useState("");
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

  let saveNewPost = async (content) => {
    var new_post = {
      content: content,
      posted_at: new Date(),
      id: createUniqueId()
    };

    var posts = [];
    if (feedData != null) {
      posts = JSON.parse(feedData);
    }
    posts.push(new_post);

    try {
      await AsyncStorage.setItem('FeedData', JSON.stringify(posts));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }

  };

  let createUniqueId = () => {
    let posts = JSON.parse(feedData);

    let code = new Date().toString();
    var characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!"@#$%^&*()_+-=[]{}:;<,>?';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return code;
  }

  return (
        <View style={styles.container}>
          <TouchableOpacity 
            onPress={() => props.navigation.goBack() }
            style={styles.buttonStyleDanger}> 
            <View style={styles.keepRow}>
              
              <Text style={styles.buttonText} >
                Cancel
              </Text>
            </View>
          </TouchableOpacity>

          <TextInput
            style={{ height: 120, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => setNewPostContent(text)}
            value={newPostContent}
            style={styles.input}
          />

          <TouchableOpacity 
            onPress={() => saveNewPost(newPostContent) }
            style={styles.buttonStyle}> 
            <View style={styles.keepRow}>
              
              <Text style={styles.buttonText} >
                People need to hear this
              </Text>
            </View>
          </TouchableOpacity>
        </View>
  );
}

NewPostScreen.navigationOptions = {
  header: null
};