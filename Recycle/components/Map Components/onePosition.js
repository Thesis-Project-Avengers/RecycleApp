import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
        Alert.alert("Switch to  collector")
      } else {
        setVisibleModal(1);
      }
      setPressCount(0); // Reset press count
    }
  };
  return (
    <Marker
      onPress={handlePress}
      coordinate={{
        latitude: loc.location?.latitude,
        longitude: loc.location?.longitude,
      }}
      pinColor={"black"}
    >
      <Icon
        name="bottle-soda"
        size={30}
        color={"#93C572"}
        style={{
          backgroundColor: "#186F65",
          borderRadius: 50,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#93C572",
        }}
      />
    </Marker>
  );
};

export default OnePosition;
