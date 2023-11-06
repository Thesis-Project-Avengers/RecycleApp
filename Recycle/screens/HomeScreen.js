import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import TipsHome from "./TipsHome";
import Services from "../components/Services";
import { FIREBASE_AUTH } from "../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  console.log(FIREBASE_AUTH.currentUser);
  //use navigation to navigate to another screen
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView
        // then i will remove the height of the the scroll view
        contentContainerStyle={{ height: 1000 }}
        showsVerticalScrollIndicator={false} >
        <Services />
        <TipsHome />

        {/* <Text>444</Text>
        <Text>444</Text>
        <Text>444</Text>
        <Text>444</Text>
        <Text>444</Text>
        <Text>444</Text>
        <Text>444</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
