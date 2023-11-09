import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import React, { useCallback } from "react";
import HomeHeader from "../components/HomeHeader";
import TipsHome from "./TipsHome";
import Services from "../components/Services";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { color } from "react-native-elements/dist/helpers";
import Stats from "../components/Stats";
import { useFocusEffect } from "@react-navigation/native";
// import Stats from "../components/Stats";r

const HomeScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView
        // then i will remove the height of the the scroll view
        contentContainerStyle={{ height: 1200 }}
        showsVerticalScrollIndicator={false}
      >
        <Services />
        <Stats />
        <TipsHome />
        <Stats />
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
