import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import OneTipHome from "../components/OneTipHome";
import { FIREBASE_DB } from "../firebaseConfig";
import {  collection, getDocs, orderBy, query } from "firebase/firestore";

const TipsHome = () => {
  const [tips, setTips] = useState([]);
  useEffect(() => {
    const refrence = collection(FIREBASE_DB, "Tips")
    const q = query(refrence, orderBy("createdAt", "desc"));
    getDocs(q).then((querySnapshot) => {
      const tipsData = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().image) {
          const data = { id: doc.id, ...doc.data() }
          tipsData.push(data);
        }
      });
      setTips(tipsData);
    })
  }, []);

  if (tips.length > 0) {
    return (
      <View style={styles.container}>
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
          contentContainerStyle={{ gap: 20 }}
        >
          {tips.map((tip) => (
            <OneTipHome key={tip.id} tip={tip} />
          ))}
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
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

