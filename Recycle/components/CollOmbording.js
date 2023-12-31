import {
  Alert,
  StatusBar,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDumpster } from "@fortawesome/free-solid-svg-icons/faDumpster";
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons/faMotorcycle";
import { faCartFlatbedSuitcase } from "@fortawesome/free-solid-svg-icons/faCartFlatbedSuitcase";
import { faSeedling } from "@fortawesome/free-solid-svg-icons/faSeedling";
import { Icon, Text } from "react-native-elements";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

const CollOmbording = () => {
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
  // console.log(colQuestion);
  const handleYesPress = (index, value) => {
    setColQuestion({ ...colQuestion, [index]: value });
    onboardingRef.current?.goNext();
  };

  const handleNoPress = (index, value) => {
    setColQuestion({ ...colQuestion, [index]: value });
    onboardingRef.current?.goNext();
  };
  console.log(cate);
  const handleGetStartedPress = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
      let arr = []
      for (let key in cate){
        if(cate[key]){
          arr.push(key)
        }
      }
      console.log(arr);
      const data = {
        pickingTrash: colQuestion["1"],
        hasTransport: colQuestion["2"],
        isEquipped: colQuestion["3"],
        natureFriendly: colQuestion["4"],
        categories: arr,
        points: 100
      };
      await updateDoc(docRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Onboarding
        showDone={false}
        bottomBarColor={"#93c572"}
        transitionAnimationDuration={700}
        onSkip={() => {
          onboardingRef.current.goToPage(5);
        }}
        ref={onboardingRef}
        pages={[
          {
            title: "Hey!",
            backgroundColor: "#fff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faDumpster}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you hate looking for valuable items in the trash ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(1, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(1, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Transport",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faMotorcycle}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you own a motorcycle or any other vehicle suitable for
                  waste collection ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(2, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.touchableOpacityStyle}>
                    <Text
                      style={{ color: "white" }}
                      onPress={() => {
                        handleNoPress(2, false);
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Be equipped",
            backgroundColor: "#ffff",
            titleStyles: { color: "#93c572" },
            image: (
              <FontAwesomeIcon
                size={100}
                icon={faCartFlatbedSuitcase}
                style={{ color: "#93c572" }}
              />
            ),
            subtitle: (
              <View style={styles.subtitleMainView}>
                <Text style={{ textAlign: "center" }}>
                  Do you have the necessary equipment for collecting waste, such
                  as waste bins or bags ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(3, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(3, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>No</Text>
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
                  Are you eco-conscious and interested in contributing to a
                  cleaner environment ?
                </Text>
                <View style={styles.subtitleSecondView}>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleYesPress(4, true);
                    }}
                  >
                    <Text style={{ color: "white" }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchableOpacityStyle}
                    onPress={() => {
                      handleNoPress(4, false);
                    }}
                  >
                    <Text style={{ color: "white" }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ),
          },
          {
            title: "Choose what kind of trash you are interested in",
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
                  handleGetStartedPress();
                  //   Alert.alert("done " + colQuestion);
                  navigation.navigate("App",{first:true}); // navigation && updtate the user
                  // navigation to the app  && updtae the user
                  StatusBar.setBarStyle("default");
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
      />
    </View>
  );
};

export default CollOmbording;

const styles = StyleSheet.create({
  subtitleMainView: {
    padding: 15,
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
  }
  ,
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
