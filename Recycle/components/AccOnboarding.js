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
import { SafeAreaView } from "react-native-safe-area-context";
const AccOnboarding = () => {
  const navigation = useNavigation();
  const [colQuestion, setColQuestion] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [cate,setCat]= useState({
    aluminum: false,
    glass:false,
    paper:false,
    plastic:false,
    cardBoard:false,
    steel:false
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
      let arr = []
      for (let key in cate){
        if(cate[key]){
          arr.push(key)
        }
      }
      const data = {
        hasWaste: colQuestion["1"],
        tasrhSorting: colQuestion["2"],
        interactionFriendly: colQuestion["3"],
        treeFriendly: colQuestion["4"],
        categories: arr,
        points: 0
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
            title: "choose what kind of trash you can accumulate",
            titleStyles: { color: "#93c572" },
            subtitle: (
              <View style={{gap:10}}>
                <View style={{flexDirection:"row",gap:10}}>
                  <TouchableOpacity   onPress={()=>{setCat({...cate,aluminum:!cate.aluminum}) }} style={cate.aluminum?styles.isClickedCat:styles.notClickedCat}>
                    <Text  style={cate.aluminum?styles.textClicked:styles.textNotClicked}>Aluminum </Text>
                  </TouchableOpacity>
                  <TouchableOpacity   onPress={()=>{setCat({...cate,glass:!cate.glass}) }}style={cate.glass?styles.isClickedCat:styles.notClickedCat}>
                    <Text style={cate.glass?styles.textClicked:styles.textNotClicked}>Glass </Text>
                  </TouchableOpacity>
                  <TouchableOpacity   onPress={()=>{setCat({...cate,paper:!cate.paper}) }}style={cate.paper?styles.isClickedCat:styles.notClickedCat}>
                    <Text style={cate.paper?styles.textClicked:styles.textNotClicked}>Paper</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row",gap:10}}>
                  <TouchableOpacity  onPress={()=>{setCat({...cate,plastic:!cate.plastic}) }} style={cate.plastic?styles.isClickedCat:styles.notClickedCat}>
                    <Text style={cate.plastic?styles.textClicked:styles.textNotClicked}>Plastic </Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>{setCat({...cate,cardBoard:!cate.cardBoard}) }} style={cate.cardBoard?styles.isClickedCat:styles.notClickedCat}>
                    <Text style={cate.cardBoard?styles.textClicked:styles.textNotClicked}>Cardboard </Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={()=>{setCat({...cate,steel:!cate.steel}) }} style={cate.steel?styles.isClickedCat:styles.notClickedCat}>
                    <Text style={cate.steel?styles.textClicked:styles.textNotClicked}>Steel </Text>
                  </TouchableOpacity>
                </View>
                
              </View>
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
          onboardingRef.current.goToPage(5);
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
  isClickedCat:{
    backgroundColor: "#93c572",
    borderRadius: 15,
    width:100,
    alignItems:'center',
    borderColor: "#93c572",
    borderWidth: 2,
    padding: 10 ,


  },
  notClickedCat: {
    backgroundColor: "white",
    borderRadius: 15,
    width:100,
    alignItems:'center',
    borderColor: "#93c572",
    borderWidth: 2,
    padding: 10 
  },
  textClicked:{
    color:"white"
  },
  textNotClicked:{
    color:"#93c572"
  }
});
