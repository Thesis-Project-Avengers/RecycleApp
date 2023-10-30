import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanQR = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not Yet Scanned");
  
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
  
      })()
    }
    // Request camera permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
  
    // what happens when we scan the bar code 
    const handelBarCodeScanner = ({ type, data }) => {
      setScanned(true);
      setText(data);
      console.log("type: " + type + "\n data: " + data);
    }
    // check permission and return the screens 
    if (hasPermission == null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera </Text>
        </View>
      )
    }
    if (hasPermission == false) {
      return (
        <View >
          <Text style={{margin: 10}}>no Access to camera</Text>
          <Button title={"Allow camera"} onPress={()=>askForCameraPermission()}/>
        </View>
      )
    }
  
    return (
      <View style={styles.container}>
        <View style = {styles.barcodebox}>
        <BarCodeScanner 
        onBarCodeScanned={scanned? undefined : handelBarCodeScanner}
        style={{height: 400, width: 400}}/>
        </View>
        <Text style = {styles.maintext} >{text}</Text>
        {scanned && <Button title={'Scan again'} onPress ={() => setScanned(false)} color='tomato' />}
      </View>
    );
}

export default ScanQR

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
  });
  