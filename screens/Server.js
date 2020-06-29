import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import publicIP from 'react-native-public-ip';
import socketIO from 'socket.io-client';

var currentIp = "Resolving...";
var currentPort = "Resolving...";
var serverRunning = false;
var serverStatus = "Server off";
var initialized = false;
var socket = null;
var drawer = null;

const ServerHelper = {

  appStart: function(){
    console.log("Server Starting...");
    this.serverStatus = "Booting...";
    this.serverRunning = false;
    this.refreshIp();
  },
  startServer: function(){
    console.log("Server Starting...");
    this.serverStatus = "Server starting up...";
// simulate initializing
    setTimeout(() => { this.serverInit(); this.refreshIp(); }, 2000);
  },
  stopServer: function(){
    console.log("Server Stopping...");
    this.serverStatus = "Server stopping...";
    this.serverRunning = false;
    this.serverDisconnect();
    this.refreshIp();
// simulate deinitializing
    setTimeout(() => { this.serverStatus = "Server off"; }, 2000);
    
  },
  setDrawer: function(d){
    this.drawer = d;
  },
  refreshIp: function(){
    console.log("Refresh IP");
    this.currentPort = 6789;
    publicIP()
      .then(ip => {
        if (!initialized) {
          this.currentIp = ip;
//          this.serverInit();
        } else if (this.currentIp != ip) {
          this.currentIp = ip;
          this.ipChanged();
        }
        this.currentIp = ip;
        console.log(this.serverRunning + "Current IP:" + ip);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getIp: function() {
    return this.currentIp;
  },
  getPort: function() {
    return this.currentPort;
  }, 
  getServerRunning: function() {
    return this.serverRunning;
  },
  getServerStatus: function() {
    return this.serverStatus;
  },
  ipChanged: function() {
    console.log("IP has changed:" + this.currentIp);
  },
  serverInit: function() {
    initialized = true;
    console.log("Server Init:" + this.currentIp);
    this.socket = socketIO(this.currentIp, {
      transports: ['websocket'],
      jsonp: false
    });

    this.socket.connect();
    
    this.socket.on('connect', () => {
      console.log('Connect');
    });

    this.socket.on('disconnect', () => {
      console.log('connection to server lost.');
    });
    
    this.socket.on('newMessage', (message) => {
      console.log("Got Message" + message);
    });

    this.serverStatus = "Server running...";
    this.serverRunning = true;
//    this.drawer.navigation.closeDrawer();
  },
  serverDisconnect: function() {
    if (this.socket) {
      console.log("Disconnceting Socket");
      this.socket.disconnect();
    }
  }
}

export default ServerHelper;