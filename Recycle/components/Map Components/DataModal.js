import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";

const InfoOfModal = ({
  currentInformation,
  currentRegion,
  handleAnimate,
  setShowWay,
  setVisibleModal,
  setMode,
  getSelectedInformation,
  selectedPos,
  mode,
}) => {
  const styles = StyleSheet.create({
    modalContent: {
      height: "50%",
      backgroundColor: "white",
      padding: 22,
      justifyContent: "space-around",
      alignItems: "center",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    Content: {
      height: "100%",
      backgroundColor: "white",
      padding: 15,
      justifyContent: "space-around",
      alignItems: "center",
    },
    modalText: {
      fontSize: 25,
      alignSelf: "center",
      textAlign: "center",
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    icon: {
      marginRight: 10,
      fontSize: 20,
      borderWidth: 1,
      borderColor: "#93C572",
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color: "#93C572",
    },
    selectedIcon: {
      marginRight: 10,
      fontSize: 20,
      backgroundColor: "#93C572",
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color: "white",
    },
  });
  return (
    <View style={styles.Content}>
      <Icon
        name="bottle-wine-outline"
        size={30}
        color={"#93C572"}
        style={{
          alignSelf: "center",
          fontSize: 70,
          borderRadius: 50,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#93C572",
          padding: 1,
        }}
      />
      <Text style={styles.modalText}>
        {currentInformation?.destination_addresses[0]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          marginVertical:20
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Icon
            name="map-marker-distance"
            size={30}
            color={"#93C572"}
            style={{
              marginRight: 5,
              marginLeft: 5,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.distance.text}
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Icon
            name="timer-outline"
            size={10}
            color={"#93C572"}
            style={{
              marginLeft: 20,
              marginRight: 5,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.duration.text}
          </Text>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", padding: "2%", alignItems: "center",marginBottom:20 }}
      >
        <Text style={{ fontSize: 20, marginRight: 10 }}>Mode</Text>
        <Icons
          onPress={() => {
            setMode("walking");
            getSelectedInformation(selectedPos, "walking");
          }}
          name="walking"
          style={mode === "walking" ? styles.selectedIcon : styles.icon}
        />
        <Icons
          onPress={() => {
            setMode("driving");
            getSelectedInformation(selectedPos, "driving");
          }}
          name="car-side"
          style={mode === "driving" ? styles.selectedIcon : styles.icon}
        />
      </View>

      <TouchableOpacity>
        <Text
          onPress={() => {
            setShowWay(1);
            setVisibleModal(0);
            handleAnimate(currentRegion);
          }}
          style={{
            backgroundColor: "#93C572",
            width: 200,
            alignSelf: "center",
            textAlign: "center",
            paddingHorizontal: 40,
            paddingVertical: 15,
            fontSize:15,
            color: "white",
            borderRadius: 50,
            letterSpacing:2
          }}
        >
          Collect
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InfoOfModal;
