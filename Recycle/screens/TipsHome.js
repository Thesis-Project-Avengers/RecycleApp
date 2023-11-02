import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import OneTipHome from "../components/OneTipHome";

const TipsHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.articlesContainer}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Tips</Text>
          <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ fontSize: 13, color: "green" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ gap: 10 }} showsVerticalScrollIndicator={false}>
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
        </ScrollView>
      </View>
      <FloatingAction color="#93C572" />
    </SafeAreaView>
  );
};

export default TipsHome;

export const styles = StyleSheet.create({
//   container:{
// backgroundColor: 'red'
//   },
  articlesContainer: {
    flexDirection: "column",
    gap: 2,
    padding: 1,
    marginBottom: 10
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 230,
    alignItems: "center",
    margin: 1,
    padding:5
  },
 
});
