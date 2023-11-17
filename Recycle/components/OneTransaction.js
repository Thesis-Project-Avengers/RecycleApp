import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Icon1 from "react-native-vector-icons/AntDesign";
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
import RatingProfile from "./RatingProfile";
const OneTransaction = ({ request, handleAccept, handleRefuse }) => {
  const [senderInfo, setSenderInfo] = useState({});
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={20}
          color="gold"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };
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
        width: "100%",
        backgroundColor: "#eee",
        padding: 20,
        borderRadius: 10,
        gap: 15
        // height: 120,
        // borderWidth: 0.2,
      }}
    >
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, width: "80%" }}>
            {/* <View> */}
            <Image
              source={{
                uri: senderInfo?.photoURL,
              }}
              style={{ width: 80, height: 80, borderRadius: 10 }}
            />


            {/* </View> */}
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#93C572", fontSize: 20, fontWeight: 700 }}>{senderInfo?.firstName},</Text>
              <Text style={{ color: "#93C572", fontSize: 20, fontWeight: 700 }}>{senderInfo?.lastName}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Icon1 name="calendar" color="#93C572" size={17} />
                <Text>
                  {request?.createdAt?.toDate().toString().slice(15, 18) > 12 ? request?.createdAt?.toDate().toString().slice(15, 21) + " PM" : request?.createdAt?.toDate().toString().slice(15, 21) + " AM"}
                </Text>
              </View>
            </View>
          </View>
          <Fontisto style={{ alignSelf: "flex-start" }} name="recycle" size={35} color={"#93C572"} />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 5 }}>

        {renderStars(
          ((senderInfo?.rating / (senderInfo?.nbrRaters * 5) * 100) * 0.05)
        )}
        <Text>
          ({senderInfo?.nbrRaters}) Reviews
        </Text>
      </View>



      {/* Hr Line */}
      <View style={{ backgroundColor: "black", height: 1, opacity: 0.1 }}>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 30 }} >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#93C572",
            padding: 10,
            justifyContent: "center",
            borderRadius: 10
          }}
          onPress={() => {
            handleAccept(request);
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Accept</Text>
          <Icon name="check-circle-outline" size={25} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "lightgray",
            padding: 10,
            justifyContent: "center",
            borderRadius: 10
          }}
          onPress={() => {
            handleRefuse(request);
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Reject</Text>
          <Icon name="do-not-disturb-alt" size={25
          } color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OneTransaction;
