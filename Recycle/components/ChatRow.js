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
        <Image
          source={{
            uri: chattedUserInfo?.photoURL,
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View>
          <Text>{chattedUserInfo?.displayName}</Text>
          <Text>{room?.lastMessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
const styles = StyleSheet.create({
  messagesContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 5,
    borderRadius: 35,
  },
});
