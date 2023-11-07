import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Stats = () => {
  // const data = [{ value: 30 }, { value: 80 }, { value: 90 }];
  const images = [
    require("../assets/accumulator.png"),
    require("../assets/accumulator.png"),
    require("../assets/accumulator.png"),
    require("../assets/accumulator.png"),
    require("../assets/accumulator.png"),
  ];
  const val = 50
  return (
    <View style={{ width: "100%",padding:20 }}>
      <View style={styles.containerr}>
        <View key={0} style={styles.barContainer}>
          <View style={[styles.bar, { height: 30, width: val*3 }]} />
          <Image source={images[0]} style={styles.image} />
        </View>
        <View key={1} style={styles.barContainer}>
          <View style={[styles.bar, { height: 30, width: 50 }]} />
          <Image source={images[1]} style={styles.image} />
        </View>
        <View key={3} style={styles.barContainer}>
          <View style={[styles.bar, { height: 30, width: 100 }]} />
          <Image source={images[3]} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

export default Stats;
const styles = StyleSheet.create({
  containerr: {
    backgroundColor: "#eee",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  barContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    // justifyContent: "space-between",

    marginRight: 10, // Spacing between bars
  },
  bar: {
    backgroundColor: "#93C572", // Bar color
    // width: 300, // Bar width,
    // flexDirection:"row",
    borderRadius: 5, // Optional: Adds rounded corners to the bar
  },
  image: {
    width: 50, // Image width
    height: 50, // Image height
    resizeMode: "contain", // Adjust the image content mode as needed
    marginBottom: 5, // Optional: Adds spacing between the image and the bar
  },
});
