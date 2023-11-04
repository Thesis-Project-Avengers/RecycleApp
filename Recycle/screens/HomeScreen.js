import { View, Text, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import TipsHome from "./TipsHome";
import Services from "../components/Services";

const HomeScreen = ({ navigation }) => {
  //use navigation to navigate to another screen
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView  showsVerticalScrollIndicator={false} style={{ margin: 5,gap: 10 }}>
      <Services />
      <TipsHome />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    padding: 8,

  
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
