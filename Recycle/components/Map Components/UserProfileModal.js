import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Feather";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
const UserProfileModal = ({ user }) => {
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
      const roomsCollection = collection(FIREBASE_DB, "rooms");
      const roomDocRef = await addDoc(roomsCollection, { chattedOne: user?.uid, connectedOne: FIREBASE_AUTH.currentUser?.uid, lastMessage: "...", lastMessageDate: serverTimestamp() });
      console.log("Document written with ID: ", roomDocRef.id);
      navigation.navigate("specificChat", { roomId: roomDocRef.id })
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
        {renderStars(user?.rating / 5 || 1)}
      </View>
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
    </View>
  );
};

export default UserProfileModal;
