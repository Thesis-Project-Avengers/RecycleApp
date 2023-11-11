import {
  Alert,
  StatusBar,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPeopleCarryBox } from "@fortawesome/free-solid-svg-icons/faPeopleCarryBox";
import { faSeedling } from "@fortawesome/free-solid-svg-icons/faSeedling";
import { faHandsBubbles } from "@fortawesome/free-solid-svg-icons/faHandsBubbles";
import { faRecycle } from "@fortawesome/free-solid-svg-icons/faRecycle";
import { Icon, Text } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
const AccOnboarding = () => {
  const navigation = useNavigation();
  const [colQuestion, setColQuestion] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const onboardingRef = useRef(null);
  const handleYesPress = (index, value) => {
    setColQuestion({ ...colQuestion, [index]: value });
    onboardingRef.current?.goNext();
  };

  const handleNoPress = (index, value) => {
    setColQuestion({ ...colQuestion, [index]: value });
    onboardingRef.current?.goNext();
  };
  const handleGetStartedPress = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
      const data = {
        hasWaste: colQuestion["1"],
        tasrhSorting: colQuestion["2"],
        interactionFriendly: colQuestion["3"],
        treeFriendly: colQuestion["4"],
        points:0,
      };
      await updateDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Onboarding
        const
        pages={[
          {
            title: "Hey!",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faHandsBubbles}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you have a significant amount of waste in your house that
                  you need to dispose of ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(1, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(1, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Recycle",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faRecycle}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you commit to sorting your waste and putting recyclable
                  materials in the correct recycling bins?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(2, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(2, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Make connection",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faPeopleCarryBox}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you like interacting and sharing articles with other app
                  users ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(3, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(3, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Nature",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faSeedling}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Would you like to be part of our initiative to make the world
                  greener by planting a tree for every significant waste
                  contribution you make ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(4, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(4, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "That's Enough",
            titleStyles: { color: "#93c572" },
            subtitle: (
              <TouchableOpacity
                title={"Get Started"}
                style={{
                  backgroundColor: "#93c572",
                  padding: 10,
                  borderRadius: 5,
                }}
                textStyle={{ color: "#ffff" }}
                onPress={() => {
                  // Alert.alert('done');
                  handleGetStartedPress();
                  navigation.navigate("App"); // navigation && updtate the user
                  // StatusBar.setBarStyle('default');
                }}
              >
                <Text style={{ color: "white" }}>Get Started</Text>
              </TouchableOpacity>
            ),
            backgroundColor: "#ffff",
            image: (
              <Icon
                style={{ justifyContent: "center" }}
                name="rocket"
                type="font-awesome"
                size={100}
                color="#93c572"
              />
            ),
          },
        ]}
        showDone={false}
        bottomBarColor={"#93c572"}
        transitionAnimationDuration={700}
        onSkip={() => {
          onboardingRef.current.goToPage(4);
        }}
        ref={onboardingRef}
      />
    </View>
  );
};

export default AccOnboarding;

const styles = StyleSheet.create({
  subtitleMainView: {
    padding: 20,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  subtitleSecondView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 50,
  },
  touchableOpacityStyle: {
    backgroundColor: "#93c572",
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
