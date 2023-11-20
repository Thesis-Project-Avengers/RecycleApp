import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState({})
  useFocusEffect(useCallback(() => {
    FIREBASE_AUTH.onAuthStateChanged(user => {
      if (user) {
        const userDocRef = doc(
          FIREBASE_DB,
          "users",
          user?.uid
        );
         getDoc(userDocRef).then((user) => {
          setUser(user.data());
        });
      } else {
        // No user is signed in
        console.log('No user is signed in');
      }
    })
  }, []))

  return (
    <SafeAreaView style={styles.headerContainerHome}>
      <View style={styles.ImageName}>
        <Image source={{
          uri: user?.photoURL
        }} style={styles.oneImage} />
        <View style={styles.text}>
          <Text style={{ fontSize: 20, fontWeight: 900, color: "gray" }}>
            Hi, </Text>
          <Text style={{ fontSize: 20, fontWeight: 900, color: "#93C572" }}>
            {user?.firstName}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }} onPress={()=>{navigation.navigate("store")}}>
        
        <View style={styles.point}>
          <Text style={{ fontSize: 15, color: "#fff" }}>{user.points}</Text>
          <Image source={require("../assets/coin.png")} style={styles.imageCoin} />
        </View>
          <Icon name="shopping-cart"  size={25} color={'#93C572'}/>
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
  ImageName: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },
  oneImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#eef"
  },
  text: {
    flexDirection: "row",
  },
  point: {
    width: 90,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#93C572",
    position: "relative",
    zIndex: -1,
    flexDirection: "row",
    gap: 7
  },
  imageCoin: {
    width: 20,
    height: 20
  },
});
