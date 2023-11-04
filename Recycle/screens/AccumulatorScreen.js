import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AccumulatorScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("collector");
          }}
        >
          <Icon name="arrow-left" size={20} color={"white"} />
          <Text
            style={{
              textAlign: "right",
              color: "white",
              fontSize: 20,
              marginRight: 10,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/accumulator.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="bottle-wine-outline" color={"green"} size={30} />
          <Text>hello bango is the best person in </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="bottle-wine-outline" color={"green"} size={30} />
          <Text>hello bango is the best person in </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="bottle-wine-outline" color={"green"} size={30} />
          <Text>hello bango is the best person in </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="bottle-wine-outline" color={"green"} size={30} />
          <Text>hello bango is the best person in the</Text>
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("chooseScreen", { user: user });
          }}
        >
          <Text
            style={{
              textAlign: "right",
              color: "white",
              fontSize: 20,
              marginRight: 10,
            }}
          >
            {" "}
            Next{" "}
          </Text>
          <Icon name="arrow-right" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccumulatorScreen;

const styles = StyleSheet.create({
  backContainer: {
    // backgroundColor:"red",
    // padding:20
  },
  backButton: {
    backgroundColor: "#93C572",
    width: "40%",
    padding: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  imageContainer: {
    height: "45%",
    marginTop: 30,
  },
  textContainer: {
    padding: 15,
    // backgroundColor:"red",
    height: "35%",
    gap: 20,
  },
  button: {
    backgroundColor: "#93C572",
    width: "40%",
    padding: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
});
