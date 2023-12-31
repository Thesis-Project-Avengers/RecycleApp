import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Feather";
import { addDoc, and, collection, doc, getDocs, or, query, serverTimestamp, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useState } from "react";
const UserProfileModal = ({ user, setVisibleModal }) => {
  const navigation = useNavigation()
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Icon
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



  const handleChatClick = async () => {
    try {
      let roomId;
      const roomExists = async () => {
        try {
          const roomsCollection = collection(FIREBASE_DB, "rooms");
          const querySnapshot = await getDocs(roomsCollection);
      
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const usersArray = data.users;
            
      
            // Check if both users are in the 'users' array
            if (usersArray.includes(user?.uid) && usersArray.includes(FIREBASE_AUTH.currentUser?.uid)) {
              roomId = doc.id;
              return true;
            }
          }
      
          // If no document contains both users
          return false;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
      
      // const roomExists = async () => {
      //   try {
      //     const roomsCollection = collection(FIREBASE_DB, "rooms");
      //     const q = query(roomsCollection, and(where("users", "array-contains", user?.uid), where("users", "array-contains", FIREBASE_AUTH.currentUser?.uid)))
      //     // const q2 = query(roomsCollection, or(where("connectedOne", "==", user?.uid), where("chattedOne", "==", FIREBASE_AUTH.currentUser?.uid)))
      //     const roomDocSnapshot = await getDocs(q);
      //     // const roomDocSnapshot2 = await getDocs(q2);
      //     roomId = roomDocSnapshot.docs[0]?.id;
      //     console.log("it s the value ", roomDocSnapshot.empty);
      //     return roomDocSnapshot.empty
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      if (!await roomExists()) {
        const roomsCollection = collection(FIREBASE_DB, "rooms");
        const roomDocRef = await addDoc(roomsCollection, { chattedOne: user?.uid, connectedOne: FIREBASE_AUTH.currentUser?.uid, lastMessage: "...", lastMessageDate: serverTimestamp(), users: [user?.uid, FIREBASE_AUTH.currentUser?.uid] });
        // console.log("Document written with ID: ", roomDocRef.id);
        navigation.navigate("specificChat", { roomId: roomDocRef.id });
      } else {
        navigation.navigate("specificChat", { roomId: roomId });

      }
      // const chatsCollection = collection(FIREBASE_DB, "rooms", roomDocRef.id, "chats");
    } catch (error) {
      console.log("Error : when Creating the room ", error);
    }
  };
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <TouchableOpacity
        onPress={handleChatClick}
        style={{ position: "absolute", top: 0, right: 0 }}>
        <Icons
          name="message-circle"
          size={30}
          color="#93C572"

        />
      </TouchableOpacity>
      <Image
        style={{ height: 150, width: 150, borderRadius: 100 }}
        source={{
          uri: user?.photoURL,
        }}
      />
      <Text style={{ padding: 5, fontSize: 20, letterSpacing: 2 }}> {user?.displayName}</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {renderStars(((user?.rating / (user?.nbrRaters * 5) * 100) * 0.05))}
      </View>
      <TouchableOpacity onPress={(() => { navigation.navigate("profileVisitor", user = { user }); setVisibleModal(0) })} >
        <Text
          style={{
            padding: 10,
            backgroundColor: "#93C572",
            color: "white",
            borderRadius: 50,
            paddingHorizontal: 30,
          }}
        >
          View Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileModal;
