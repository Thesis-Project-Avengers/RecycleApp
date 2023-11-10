import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBullet from "../components/ChatBullet";
import ChatRow from "../components/ChatRow";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
const ChatScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(FIREBASE_AUTH.currentUser.uid);
  useFocusEffect(
    useCallback(() => {
      const currentUsersRooms = collection(FIREBASE_DB, "rooms");
      const q = query(
        currentUsersRooms,
        or(
          where("chattedOne", "==", FIREBASE_AUTH.currentUser?.uid),
          where("connectedOne", "==", FIREBASE_AUTH.currentUser?.uid)
        )
      );
      const data = [];
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setRooms(data);
        setLoading(false);
      });
    }, [])
  );
  if (loading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ActivityIndicator size="large" color="black" />
      <Text>Loading....</Text>
    </View>
  } else {
    return (
      <View style={{ padding: 10, gap: 25, backgroundColor: "white" }}>
        <ChatHeader />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chatBullet}
        >
          {rooms.map((room, key) => {
            return <ChatBullet key={key} room={room} />;
          })}
        </ScrollView>
        <ScrollView style={{ height: "67%" }}>
          {rooms.map((room, key) => {
            return <ChatRow key={key} room={room} />;
          })}
        </ScrollView>
      </View>
    );
  }
};
export default ChatScreen;

const styles = StyleSheet.create({
  oneImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  chatBullet: {
    height: 110,
    gap: 10,
  },
});
