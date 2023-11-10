import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';

const ChatBullet = ({ room }) => {
  const [chattedUserInfo, setChattedUserInfo] = useState({})
  const navigation = useNavigation()
  useFocusEffect(
    useCallback(() => {
      const userId = room?.chattedOne === FIREBASE_AUTH.currentUser?.uid ? room?.connectedOne : room?.chattedOne
      const userdocReference = doc(FIREBASE_DB, "users", userId);
      getDoc(userdocReference).then((doc) => {
        setChattedUserInfo(doc.data());
      });
    }, [])
  );
  const handleRoomPressNavigation = () => {
    navigation.navigate("specificChat", { roomId: room.id });
  };

  return (
    <TouchableOpacity onPress={handleRoomPressNavigation}>
      <View style={styles.oneBullet} >
        <Image source={{ uri: chattedUserInfo?.photoURL }} style={styles.oneImage} />
        <Text style={{ fontSize: 12 }}> {chattedUserInfo?.displayName?.length > 10 ? chattedUserInfo?.displayName?.slice(0, 10) + "..." : chattedUserInfo?.displayName}   </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ChatBullet
const styles = StyleSheet.create({

  oneImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#eef"

  },
  oneBullet: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5
  }
})