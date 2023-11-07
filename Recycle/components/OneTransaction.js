import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FIREBASE_AUTH, FIREBASE_REALTIME_DB } from "../firebaseConfig";
import { ref, set } from "firebase/database";
const OneTransaction = () => {
  
  const handleAccept = async () => {
    try {
      set(ref(FIREBASE_REALTIME_DB, "requests/" + "aWeowr1HM6ObgHZYv8ik"), {
        senderId: FIREBASE_AUTH.currentUser?.uid,
        receiverId: "aWeowr1HM6ObgHZYv8ik",
        status: "done",
        markerId: "aWeowr1HM6ObgHZYv8ik",
      });
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
          uri: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347389791_1387274348784480_3857632196740571851_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nuDCT1q5m00AX8dh_ds&_nc_ht=scontent.ftun9-1.fna&oh=00_AfDqeywZ8D9vUUY25LDX7JaAosD21Lqx7y-zmuA3Sux6IQ&oe=654F96D3",
        }}
        style={{ width: 60, height: 60, borderRadius: 100 }}
      />
      <Text> belhassen sehli</Text>
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
