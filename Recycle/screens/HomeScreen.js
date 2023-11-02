import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import TipsHome from "./TipsHome";
import Services from "../components/Services";

const HomeScreen = ({ navigation }) => {
  //use navigation to navigate to another screen
  return (
    <View style={styles.container}>
      <HomeHeader />
      <Services />
      <TipsHome />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
