import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import QRCode from "react-native-qrcode-svg";
import { FIREBASE_AUTH } from "../firebaseConfig";


const MyCodeQr = () => { 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <QRCode value={FIREBASE_AUTH.currentUser?.uid} size={300} />
  </View>
  )
}

export default MyCodeQr;
