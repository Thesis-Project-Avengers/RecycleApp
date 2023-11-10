import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Marker, Callout } from "react-native-maps";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FIREBASE_AUTH } from "../../firebaseConfig";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBottleWater,
  faBox,
  faDrumSteelpan,
  faShieldHalved,
  faToiletPaper,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
const OnePosition = ({
  loc,
  user,
  setselectedPos,
  setVisibleModal,
  getSelectedInformation,
  handleAnimateToRegion,
  setShowWay,
}) => {
  const [pressCount, setPressCount] = useState(0);

  const generateIcon = (iconName) => {
    if (iconName === "Paper") {
      return faMugSaucer;
    } else if (iconName === "Cardboard Boxes") {
      return faBox;
    } else if (iconName === "Plastic Bottles") {
      return faBottleWater;
    } else if (iconName === "Glass Bottles") {
      return faWineBottle;
    } else if (iconName === "Steel Cans") {
      return faDrumSteelpan;
    } else {
      return faShieldHalved;
    }
  };

  const handlePress = () => {
    setPressCount((prevCount) => prevCount + 1);
    if (pressCount === 0) {
      setselectedPos(loc);
      getSelectedInformation(loc);
      handleAnimateToRegion(loc);
      setShowWay(0);
    }

    if (pressCount === 1) {
      if (user?.type === "accumulator") {
        Alert.alert("only collectors can claim");
      } else {
        setVisibleModal(1);
      }
      setPressCount(0);
     // Reset press count
    }
  };

  if (
    loc?.visibility ||
    !loc?.visibleBy ||
    loc?.visibleBy.includes(FIREBASE_AUTH.currentUser?.uid)
  ) {
    return (
      <Marker
        onPress={handlePress}
        coordinate={{
          latitude: loc.location?.latitude,
          longitude: loc.location?.longitude,
        }}
      >
        <FontAwesomeIcon
          icon={generateIcon(loc.category)}
          color={"#93C572"}
          size={25}
          style={{
            borderRadius: 100,
            borderWidth: 1,
            borderStyle: "solid",
        
          }}
        />
      </Marker>
    );
  }
};

export default OnePosition;
