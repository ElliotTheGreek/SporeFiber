import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { AsyncStorage, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles.js';
import ProfileSetupScreen from './ProfileSetupScreen';
import { MonoText } from '../components/StyledText';
import moment from "moment";
import Server from './Server';

export default function NewConnectionScreen(props) {
  const [inputAddress, setinputAddress] = React.useState("");
  const [inputPort, setInputPort] = React.useState("");
  const [inputCode, setInputCode] = React.useState("");
  const [inputCodeDate, setInputCodeDate] = React.useState("");
  const [connectionFeedback, setConnectioFeedback] = React.useState([]);
  const [counterId, setCounterId] = React.useState(0);

  // 0 for nothing, 1 makes a code, 2 enters a code
  const [codeState, setCodeState] = React.useState(0);

  let loadConnectionData = async () => {
    try {
      const _codeData = await AsyncStorage.getItem('ConnectionCode');
      if (_codeData) {
//        console.log("Loaded CodeData:" + _codeData);
        var codeData = JSON.parse(_codeData);
        setInputCode(codeData.code);
        setInputCodeDate(codeData.created_at);
      }
    } catch (error) {
      console.log(error);
    }
//    console.log("InputCode:" + inputCode);
    setCounterId(counterId + 1);
  };

  loadConnectionData();

  let attemptConnection = () => {

  };

  let cancel = () => {
    setinputAddress("");
    setInputPort("");
    setInputCode("");
    props.navigation.goBack()
  };

  let deleteCode = async () => {
//    console.log("Try to delete the code");
    try {
      await AsyncStorage.removeItem('ConnectionCode');
    } catch (error) {
      console.log(error);
    }
    setInputCode(null);
    setCodeState(0);
  };

  let generateCode = async () => {
    Server.refreshIp();
    var characters       = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    var charactersLength = characters.length;
    let code = "";
    for (var i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    var code_data = {
      code: code,
      created_at: new Date()
    }

    try {
      await AsyncStorage.setItem('ConnectionCode', JSON.stringify(code_data));
//      console.log("Saved Code Data:" + code_data);
    } catch (error) {
      console.log(error);
    }
//    console.log("Generate a new code");

    setInputCode(code);
    setInputCodeDate(new Date());
    setCodeState(1);
    setCounterId(counterId + 1);
  };

  if (codeState == 0 ) {
    return (
      <View style={styles.container}>
        <View style={styles.centerCntainer}>
          <Text>
            <Text style={{ fontSize: 24 }}>
            Connect to someone
            </Text>
          </Text>
          <TouchableOpacity 
            onPress={() => setCodeState(1) }
            style={styles.buttonStyle}> 
            <View style={styles.keepRow}>
              <MaterialCommunityIcons style={styles.buttonIcon} name="anchor" size={30} color="black" />
              <Text style={styles.buttonText} >
                Host a code
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setCodeState(2) }
            style={styles.buttonStyle}> 
            <View style={styles.keepRow}>
              <MaterialCommunityIcons style={styles.buttonIcon} name="rocket" size={30} color="black" />
              <Text style={styles.buttonText} >
                Enter a code
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => cancel() }
            style={styles.buttonStyle}> 
            <View style={styles.keepRow}>
              <MaterialCommunityIcons style={styles.buttonIcon} name="cancel" size={30} color="black" />
              <Text style={styles.buttonText} >
                Cancel
              </Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={styles.bottom}><Text>{connectionFeedback}</Text></View>
      </View>
    );
  } else if (codeState == 1 ) {
    let generateButtonCopy = "Generate";
    let timeLeft = (<Text style={styles.codeDisplay}> Tap Generate </Text>);
    if (inputCode && inputCode != "") {
      generateButtonCopy = "Regenerate Now";

      const a = moment();
      const b = moment(inputCodeDate).add(120, 'seconds');
      let seconds = b.diff(a, 'seconds');

      if (seconds <= 0) {
        generateCode();
      }

      var qrData = {
        ip: Server.getIp(),
        port: Server.getPort(),
        code: inputCode
      };

      timeLeft = (
        <View style={{ margin: 10}}>
          <View style={styles.centerContainer}>
            <Text style={styles.text}> They enter this</Text>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Rows data={[['Address', Server.getIp()], ['Port', Server.getPort()], ['Code', inputCode]]} textStyle={styles.tableText}/>
          </Table>

          <View style={styles.centerContainer}>
            <Text style={styles.small}> Or scan this</Text>
            <QRCode
              value={JSON.stringify(qrData)}
              size={150}
              enableLinearGradient={false}
            />
          </View>

          <View style={styles.centerContainer}>
            <CountDown
              id='{counterId}'
              until={seconds}
              onFinish={() => deleteCode() }
              size={24}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#000'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: ' ', s: ' '}} />
            <Text style={styles.small}> Until code regenerates</Text>

          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        { timeLeft }
        <TouchableOpacity 
          onPress={() => generateCode() }
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <MaterialCommunityIcons style={styles.buttonIcon} name="refresh" size={30} color="black" />
            <Text style={styles.buttonText} >
              { generateButtonCopy }
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => deleteCode() }
          style={styles.buttonStyleDanger}> 
          <View style={styles.keepRow}>
            <MaterialCommunityIcons style={styles.buttonIcon} name="close" size={30} color="black" />
            <Text style={styles.buttonText} >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottom}><Text>{connectionFeedback}</Text></View>
      </View>
    );
  } else if (codeState == 2 ) {
    return (
      <View style={styles.container}>
         <Text>
            <Text style={{ fontSize: 24 }}>
            Connect to someone
            </Text>
          </Text>

          <TextInput
            underlineColorAndroid = "transparent"
            placeholder = "Address"
            placeholderTextColor = "#ababab"
            autoCapitalize = "none"
            onChangeText = {setinputAddress}
            style={styles.input}
            value={inputAddress}
          />

          <TextInput
            underlineColorAndroid = "transparent"
            placeholder = "Port"
            placeholderTextColor = "#ababab"
            autoCapitalize = "none"
            onChangeText = {setInputPort}
            style={styles.input}
            value={inputPort}
          />

          <TextInput
            underlineColorAndroid = "transparent"
            placeholder = "Code"
            placeholderTextColor = "#ababab"
            autoCapitalize = "none"
            onChangeText = {setInputCode}
            style={styles.input}
            value={inputCode}
          />

        <TouchableOpacity 
          onPress={() => attemptConnection() }
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <Text style={styles.buttonText} >
              Connect
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setCodeState(0) }
          style={styles.buttonStyle}> 
          <View style={styles.keepRow}>
            <Text style={styles.buttonText} >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottom}><Text>{connectionFeedback}</Text></View>
      </View>
    );
  }
}

NewConnectionScreen.navigationOptions = {
  header: null
};