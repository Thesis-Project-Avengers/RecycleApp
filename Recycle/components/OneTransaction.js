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
const OneTransaction = ({ request }) => {
  const [senderInfo, setSenderInfo] = useState({});
  console.log("from one trasnaction ", request);

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

  const handleAccept = async () => {
    try {
      // in the real time 
      set(
        ref(
          FIREBASE_REALTIME_DB,
          "requests/" + request?.markerId + "/" + request?.senderId
        ),
        {
          // senderId: request?.senderId,
          // receiverId: "aWeowr1HM6ObgHZYv8ik",
          status: "done",
          // markerId: "aWeowr1HM6ObgHZYv8ik",
        }
      );
      // update the doc in the back firestore 
      const docref=doc(FIREBASE_DB,"requests",request?.id);
      await updateDoc(docref,{
        status:"done"
      })
    } catch (error) {
      console.log(error);
    }
  };

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
          handleAccept();
        }}
      >
        <Icon name="check-circle-outline" size={30} color={"green"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="do-not-disturb-alt" size={30} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

export default OneTransaction;
