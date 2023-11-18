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
import { faGift, faL } from "@fortawesome/free-solid-svg-icons";
import { color } from "react-native-elements/dist/helpers";
import Stats from "../components/Stats";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Modal from "react-native-modal";
import ConfettiCannon from "react-native-confetti-cannon";
import { Button } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Animatable from "react-native-animatable";

// import Stats from "../components/Stats";r

const HomeScreen = ({ navigation, route }) => {
  const [collectorsUsers, setCollectorsUsers] = useState([]);
  const [accumulatorsUsers, setAccumulatorUsers] = useState([]);
  const [welcome, setWelcome] = useState(route.params?.first);
  const [isConfettiVisible, setConfettiVisible] = useState(false);

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
              if (collector.length < 3 && accumulator.length < 3) {
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

  const handleButtonClick = () => {
    // Set the state to show the confetti
    setConfettiVisible(true);

    // After a delay, hide the confetti
    setTimeout(() => {
      setConfettiVisible(false);
      setWelcome(true);
    }, 2000); // Adjust the delay as needed
  };

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
        <Stats users={accumulatorsUsers} />
      </ScrollView>
      {/* modal */}
      <Modal
        isVisible={welcome === false}
        hasBackdrop={false}
        coverScreen={true}
      >
        <View
          style={{
            backgroundColor: "white",
 
            alignSelf: "center",
            justifyContent: "flex-start",
            alignItems: "center",

            borderRadius: 50,
            zIndex: 1,
            padding: 40,
            paddingVertical:70,
          }}
        >
          <Text style={{ fontSize: 29, marginBottom: 20 }}>
            Welcome To Recycle Familly
          </Text>

          <TouchableOpacity onPress={handleButtonClick}>
            <Animatable.View
              animation="bounce"
              iterationCount="infinite"
              style={{ backgroundColor: "white" }}
            >
              <FontAwesomeIcon icon={faGift} size={30} color="green" bounce />
            </Animatable.View>
          </TouchableOpacity>
          <Text >Claim Your First Points</Text>
        </View>
      </Modal>
      {isConfettiVisible && (
        <View style={{ zIndex: 5 }}>
          <ConfettiCannon
            count={100} // Adjust the number of confetti particles
            origin={{ x: -10, y: 0 }} // Adjust the origin point
            autoStart={true}
            fadeOut={false}
            fallSpeed={4000}
            autoStartDelay={0}
            explosionSpeed={100}
          />
        </View>
      )}
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
