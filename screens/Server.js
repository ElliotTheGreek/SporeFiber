import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import publicIP from 'react-native-public-ip';
import socketIO from 'socket.io-client';

var currentIp = "Resolving...";
var currentPort = "Resolving...";
var initialized = false;
var socket = null;

const ServerHelper = {

  startServer: function(){
    console.log("Server Starting...");
    this.refreshIp();
  },
  refreshIp: function(){
    console.log("Refresh IP");
    this.currentPort = 6789;
    publicIP()
      .then(ip => {
        if (!initialized) {
          this.currentIp = ip;
          this.serverInit();
        } else if (this.currentIp != ip) {
          this.currentIp = ip;
          this.ipChanged();
        }
        this.currentIp = ip;
        console.log("Current IP:" + ip);
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
  ipChanged: function() {
    console.log("IP has changed:" + this.currentIp);
  },
  serverInit: function() {
    initialized = true;
    console.log("Server Init:" + this.currentIp);
// Initialize Socket IO:
    socket = socketIO(this.currentIp, {
      transports: ['websocket'],
      jsonp: false
    });

    socket.connect();
    
    socket.on('connect', () => {
      console.log('Connect');
    });

    socket.on('disconnect', () => {
      console.log('connection to server lost.');
    });
    
    socket.on('newMessage', (message) => {
      console.log("Got Message" + message);
    });

  }
}

export default ServerHelper;