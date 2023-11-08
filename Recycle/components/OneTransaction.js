import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_REALTIME_DB,
} from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
const OneTransaction = ({ request ,handleAccept,handleRefuse}) => {
  const [senderInfo, setSenderInfo] = useState({});

  useFocusEffect(
    useCallback(() => {
      const ftechingUser = async () => {
        const userdocref = doc(FIREBASE_DB, "users", request?.senderId);
        await getDoc(userdocref).then((snapshot) => {
          setSenderInfo(snapshot.data());
        });
      };
      ftechingUser();
    }, [])
  );


  return (
    <View
      style={{
        width: "90%",
        backgroundColor: "#eee",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
      }}
    >
      <Image
        source={{
          uri: senderInfo?.photoURL,
        }}
        style={{ width: 60, height: 60, borderRadius: 100 }}
      />
      <Text>{senderInfo?.firstName}</Text>
      {/* time of creatio  of the request  */}
      <TouchableOpacity
        onPress={() => {
          handleAccept(request);
        }}
      >
        <Icon name="check-circle-outline" size={30} color={"green"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleRefuse(request);
        }}
      >
        <Icon name="do-not-disturb-alt" size={30} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

export default OneTransaction;
