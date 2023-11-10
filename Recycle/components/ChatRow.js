import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const ChatRow = ({ room }) => {
  // console.log(room);
  const navigation = useNavigation();
  const [chattedUserInfo, setChattedUserInfo] = useState({});
  // console.log("userInfo",chattedUserInfo);
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
      <View style={styles.messagesContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: chattedUserInfo?.photoURL,
            }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <View style={{ gap: 2 }}>
            <Text>{chattedUserInfo?.displayName}</Text>
            <Text style={{ fontSize: 13 }}>{room?.lastMessage.slice(0, 27)}...</Text>
          </View>
        </View>
        <Text>{room?.lastMessageDate.toDate().toString().slice(16, 21)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
const styles = StyleSheet.create({
  messagesContainer: {
    flexDirection: "row",
    // gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 35,
  },
});
