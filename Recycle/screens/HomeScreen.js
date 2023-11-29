import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  const [isConfettiVisible, setConfettiVisible] = useState(route.params.first);
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
              if (doc.data()?.type === "collector"&& collector.length<3) {
                collector.push({ ...doc.data(), id: doc.id });
              }
              if (doc.data()?.type === "accumulator" && accumulator.length<3) {
                accumulator.push({ ...doc.data(), id: doc.id });
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
      setWelcome(false);
    }, 2000); // Adjust the delay as needed
  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView
        // then i will remove the height of the the scroll view
        contentContainerStyle={{ height: 1500, gap: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Services />
        <Stats users={collectorsUsers} />
        <TipsHome />

        {/* One To Go To tHE STORE  */}
        <TouchableOpacity onPress={() => {
          navigation.navigate("store");
        }}
          style={{
            backgroundColor: "#eee",
            height: 350,
            //
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 5,
            margin: 4,
          }}
        >
          <View style={{ height: 200 }}>
            <Image
              source={require("../assets/netflix.png")}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 12,
                // left: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                justifyContent: "space-between",
                width: "100%",
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 3,
                  backgroundColor: "#93C572",
                  padding: 5,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "900" }}>900</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#93C572",
                  padding: 5,
                  borderRadius: 20,
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <Ionicons name="time" size={20} color={"#fff"} />
                <Text style={{ color: "#fff", fontWeight: 900 }}>
                  04d 15h 10m 10s
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                gap: 5,
                backgroundColor: "#fff",
                height: "77%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                  lineHeight: 30,
                }}
              >
                70% Off Netflix Subscription && Enjoy Movies
              </Text>
              <Text
                style={{
                  color: "red",
                  opacity: 0.5,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                1 Month
              </Text>
              <View style={{ width: "100%", gap: 110, flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../assets/khalil.jpg")}
                    style={{
                      position: "absolute",
                      left: 10,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 30,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/bango.jpg")}
                    style={{
                      position: "absolute",
                      left: 50,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 70,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 30,
                  }}
                >
                  <Text>+(Others)</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <Stats users={accumulatorsUsers} />


      </ScrollView>
      {/* modal */}
      <Modal
        isVisible={welcome}
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
            paddingVertical: 70,
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
