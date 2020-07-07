import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import { DefaultTheme, Appbar, Avatar, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SideBarScreen from './screens/SideBarScreen';
import TabStack from './screens/TabStack';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import NewPostScreen from './screens/NewPostScreen';
import NewConnectionScreen from './screens/NewConnectionScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import publicIP from 'react-native-public-ip';
import TcpSocket from 'react-native-tcp-socket';
import io from 'socket.io-client';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const Drawer = createDrawerNavigator();

  const [serverStatus, setServerStatus] = React.useState("");
  const [serverRunning, setServerRunning] = React.useState(false);
  const [serverLastMessage, setServerLastMessage] = React.useState("");

  const [currentIp, setCurrentIp] = React.useState("unknown");
  const [currentPort, setCurrentPort] = React.useState("unknown");

/*  const server = TcpSocket.createServer(function(socket) {
    socket.on('data', (data) => {
      socket.write('Echo server', data);
    });
   
    socket.on('error', (error) => {
      console.log('An error ocurred with client socket ', error);
    });
   
    socket.on('close', (error) => {
      console.log('Closed connection with ', socket.address());
    });
  });
   
  server.on('error', (error) => {
    console.log('An error ocurred with the server:', error);
  });
   
  server.on('close', () => {
    console.log('Server closed connection');
  }); */





  React.useEffect(() => {
//    console.log(process.env.PORT);
    appStarts();
  }, []);

  function appStarts() {
    refreshIp();
    startServerRequest();
  }

  function refreshIp() {
    setCurrentIp("Resolving...");
    setCurrentPort("180005");
    publicIP()
      .then(ip => {
        setCurrentIp(ip);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function updateServerStatus(status) {
    setServerStatus(status);
    console.log(status);
  }

  function toggleServer() {
    if (serverRunning){
      stopServerRequest();
    } else {
      startServerRequest();
    }
  }

  function onSocketConnect(s) {
    setServerLastMessage("Connected...");
  }

  function startServerRequest() {
    refreshIp();
    setServerLastMessage("Starting...");
    updateServerStatus("Starting up...");

    setServerLastMessage("Waiting...");
  /*  server.listen({
      port: 8443,
      host: "localhost",
      tls: false,
      tlsCheckValidity: false
      // tlsCheckValidity: false, // Disable validity checking
      // tlsCert: require('./selfmade.pem') // Self-signed certificate
    }); */

    startServer();
    //setTimeout(() => { startServer() }, 2000);
  }

  function stopServerRequest() {
//    if (server) {
//      server.destroy(); 
//    }
    setServerLastMessage(" ");
    updateServerStatus("Stopping server...");

    setServerRunning(false);
    setTimeout(() => { stopServer() }, 2000);
  }

  function startServer() {
    setServerRunning(true);
    updateServerStatus("Server Active:");
    /*
    const socket = io('192.168.1.253:7000', {   rejectUnauthorized: false });
    socket.on('connect', function(){
      console.log("Client Socket Connected");
    });
    socket.on('event', function(data){
      console.log("Client Socket Evemt", data);

    });
    socket.on('connect_error', function(error){
      console.log("Client Connect Error", error);

    });
    socket.on('disconnect', function(){
      console.log("Client Socket Disconnected");
    });

        socket.connect();
    // Create socket

  */
// Create socket
  const client = TcpSocket.createConnection({
    port: 7000,
    host: '192.168.1.253',
    tls: true,
    // tlsCheckValidity: false, // Disable validity checking
    // tlsCert: require('./selfmade.pem') // Self-signed certificate
});
   
  client.on('data', function(data) {
    console.log('message was received', data);
  });
   
  client.on('error', function(error) {
    console.log(error);
  });
   
  client.on('close', function(){
    console.log('Connection closed!');
  });
   
  // Write on the socket
  client.write('Hello server!');
   
  // Close socket
  client.destroy();
  }

  function stopServer() {
    setServerRunning(false);
    updateServerStatus("Server Off");
  }

  if (!isLoadingComplete) {
    return null;
  } else {

    return (
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator 
            drawerContent={ props => <SideBarScreen serverLastMessage={serverLastMessage} currentIp={currentIp} currentPort={currentPort} serverRunning={serverRunning} serverStatus={serverStatus} toggleServer={toggleServer} {...props} />}
            initialRouteName="TabStack" >
            <Drawer.Screen name="TabStack" component={TabStack} />
            {/* Stand alone components and pages below */}
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            <Drawer.Screen name="NewPost" component={NewPostScreen} />
            <Drawer.Screen name="NewConnection" component={NewConnectionScreen} />
            <Drawer.Screen name="PreferencesScreen" component={PreferencesScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

