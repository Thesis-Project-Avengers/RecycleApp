import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'

const GenerateQr = () => {
  
    const string ="yassine ya rjouli yassine ya 3sal"
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>QR Code Example</Text>
    <QRCode value={string} size={200} />
  </View>
  )
}

export default GenerateQr

