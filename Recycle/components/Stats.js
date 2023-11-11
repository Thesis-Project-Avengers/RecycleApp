
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { query } from "firebase/database";

const Stats = ({ users }) => {
  // const [images, setImages] = useState([]);

  const val = 20;

  const images = [users[0]?.photoURL, users[1]?.photoURL, users[2]?.photoURL];

  const animatedValues = useRef(
    images.map(() => {
      return new Animated.Value(0);
    })
  ).current;
  // console.log("thisanimated values  ", animatedValues);

  useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 5500, // Animation duration in milliseconds
        useNativeDriver: false,
      })
    );

    Animated.stagger(200, animations).start();
  }, []);

  return (
    <View style={{ width: "100%", padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text>Collector Stats</Text>
      </View>
      <View style={styles.container}>
        {users.map((user, index) => {
          let score = (((user?.rating / (user?.nbrRaters * 5)) * 100)*230)/100
          return (
            <View key={index} style={styles.barContainer}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    height: 30,
                    width: animatedValues[index]?.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, score],
                    }),
                  },
                ]}
              />
              <Animated.Image
                source={{ uri: images[index] }}
                style={[
                  styles.image,
                  {
                    opacity: animatedValues[index],
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 15,
  },
  barContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginRight: 10,
  },
  bar: {
    backgroundColor: "#93C572",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 5,
    borderRadius: 50,
  },
});
