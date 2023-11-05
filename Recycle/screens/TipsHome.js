import { View, Text, StyleSheet, ScrollView, Image, Touchable, TouchableOpacity, ActivityIndicator, TextInput, } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OneTipHome from "../components/OneTipHome";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";
import { FIREBASE_DB } from "../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const TipsHome = () => {
  const [tips, setTips] = useState([]);




  useEffect(() => {
    const refrence = collection(FIREBASE_DB, "Tips");
    getDocs(refrence).then((querySnapshot) => {
      const tipsData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id);
        const data = { id: doc.id, ...doc.data() };
        tipsData.push(data);
      });
      setTips(tipsData);
    });
  }, []);

  if (tips.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Tips</Text>
          <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
            <Text style={{ fontSize: 13, color: "#93C572" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ gap: 20 }}
        >

          {tips.map((tip) => (
            <OneTipHome key={tip.id} tip={tip} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading</Text>
      </View>
    );
  }
};

export default TipsHome;

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: "green",
    height: "100%",
  },
  input: {
    paddingVertical: 30,
    // paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 20,
    width: "100%",
    textAlignVertical: "top",

  }, textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 210,
    alignItems: "center",
    margin: 1,
    padding: 5
  },
});

