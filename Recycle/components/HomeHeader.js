import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { FIREBASE_DB } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
const HomeHeader = ({ image }) => {
  const userName = "Sirine ";
  return (
    <SafeAreaView style={styles.headerContainerHome}>
      <View style={styles.ImageName}>
       <Image source={{
          uri: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321",
        }} style={styles.oneImage} />
      <View style={styles.text}>
        <Text style={{ fontSize: 20, fontWeight: 900, color: "gray" }}>
          Hi, </Text>
          <Text style={{ fontSize: 20, fontWeight: 900, color: "#93C572" }}>
            {userName.length > 10 ? userName.slice(0, 10) + "..." : userName}{" "}
        </Text>
        {/* <Text style={{ fontSize: 15, color: "black" }}>
          Let's Contribute to our earth
        </Text> */}
      </View>
      </View>
        <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <View style={styles.point}>
          <Text style={{ fontSize: 15, color: "#fff" }}>Points 600</Text>
      </View>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    alignItems: "center",
    margin: 5,
  },
  ImageName:{
    flexDirection: "row",
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    gap:10
  },
  oneImage: {
    width: 50 , 
       height: 50 , 
       borderRadius: 50 , 
       borderWidth: 3,
       borderColor: "#eef"
  },
  text: {
    flexDirection: "row",
  },
  point: {
   width:90,
   height:30,
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   borderRadius: 40,
   backgroundColor:"#93C572",
   position: "relative", 
   zIndex: -1,
  },
});
