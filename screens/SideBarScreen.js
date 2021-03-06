import React, { useState, useEffect } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';

export default function SideBarScreen (props) {
  const [reconnectOthers, setReconnectOthers] = useState(0);

  const [username, setUsername] = React.useState("");

  const [connections, setConnections] = React.useState([]);
  const [activeConnections, setActiveConnections] = React.useState([]);
 
  let loadSettings = async () => {
    try {
      const _username = await AsyncStorage.getItem('username');
      setUsername(_username);
    } catch (error) {
      console.log(error);
    }
  };

  loadSettings();

  let toggleServerRunning = async () => {
    if (props.server.getServerRunning()) {
      props.server.stopServer();
    } else {
      props.server.startServer();
    }
    props.navigation.closeDrawer();
    props.navigation.openDrawer();
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={ styles.drawerContent } >
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://avatars3.githubusercontent.com/u/4521739?s=460&u=4785997588df6a2d8d7a85dbe05dae5ac27e16d0&v=4',
            }}
            size={50}
          />
          <Title style={styles.title}>{username}</Title>
          <Caption style={styles.caption}>human</Caption>
          <TouchableRipple onPress={() => { props.navigation.closeDrawer(); props.navigation.jumpTo('Network') }}>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {connections.length}
              </Paragraph>
              <Caption style={styles.caption}>Connections</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                {activeConnections.length}
              </Paragraph>
              <Caption style={styles.caption}>Active</Caption>
            </View>
          </View>
          </TouchableRipple>
        </View>
        <Drawer.Section style={styles.drawerSection}>

          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-settings"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => { props.navigation.closeDrawer(); props.navigation.jumpTo('ProfileScreen') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Preferences"
            onPress={() => { props.navigation.closeDrawer(); props.navigation.jumpTo('PreferencesScreen') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color={color}
                size={size}
              />
            )}
            label="Bookmarks"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title={props.serverStatus}>
          <View style={styles.preference}>
            <Text>{props.currentIp}:{props.currentPort}</Text>
          </View>
          <TouchableRipple onPress={() => { props.toggleServer() }}>
            <View style={styles.preference}>
              <Text>Server Running {Boolean(props.serverRunning)}</Text>
              <View pointerEvents="none">
                <Switch value={Boolean(props.serverRunning)} />
              </View>
            </View>
          </TouchableRipple>
          <View style={styles.preference}>
            <Text>{props.serverLastMessage}</Text>
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}