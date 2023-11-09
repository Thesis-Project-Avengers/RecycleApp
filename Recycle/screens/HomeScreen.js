import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import React, { useCallback, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import TipsHome from "./TipsHome";
import Services from "../components/Services";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { color } from "react-native-elements/dist/helpers";
import Stats from "../components/Stats";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import Stats from "../components/Stats";r

const HomeScreen = ({ navigation }) => {
  const [collectorsUsers, setCollectorsUsers] = useState([]);
  const [accumulatorsUsers, setAccumulatorUsers] = useState([]);

  // console.log(FIREBASE_AUTH.currentUser);
  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        try {
          const usersReference = collection(FIREBASE_DB, "users");
          const q = query(usersReference, orderBy("rating", "desc"));
          let collector = [];
          let accumulator = [];
          await getDocs(q).then((snapshot) => {
            snapshot.docs.forEach((doc, index) => {
              if (index < 3) {
                if (doc.data()?.type === "collector") {
                  collector.push({ ...doc.data(), id: doc.id });
                }
                if (doc.data()?.type === "accumulator") {
                  accumulator.push({ ...doc.data(), id: doc.id });
                }
              }
            });
            setCollectorsUsers(collector);
            setAccumulatorUsers(accumulator);
          });
        } catch (error) {

          console.log(error);
        }
      };
      fetchUsers();
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView
        // then i will remove the height of the the scroll view
        contentContainerStyle={{ height: 1200 }}
        showsVerticalScrollIndicator={false}
      >
        <Services />
        <Stats users={collectorsUsers} />
        <TipsHome />
        {/* <Stats users={accumulatorsUsers} /> */}
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
