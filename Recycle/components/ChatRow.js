import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ChatRow = () => {
  return (
    <View  style={styles.messagesContainer}>
            <Image  source={{uri:"https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321"}} style={{width:60,height:60, borderRadius:50}} />
            <View>
              <Text>khalil</Text>
              <Text>hello im here</Text>
            </View>
          </View>
  )
}

export default ChatRow
const styles = StyleSheet.create({

  messagesContainer:{
    flexDirection:"row",
    gap:20, 
    alignItems:"center",
    padding:5,
    borderRadius:35, 
  }
  
  
   })