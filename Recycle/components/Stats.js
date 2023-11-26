import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { query } from "firebase/database";

const Stats = ({ users }) => {
  const navigation = useNavigation();

  const images = [users[0]?.photoURL, users[1]?.photoURL, users[2]?.photoURL];

  const animatedValues = useRef(
    images.map(() => {
      return new Animated.Value(0);
    })
  ).current;

  const textAnimatedValues = useRef(
    images.map(() => {
      return new Animated.Value(0);
    })
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((value, index) =>
      Animated.parallel([
        Animated.timing(value, {
          toValue: 1,
          duration: 5500,
          useNativeDriver: false,
        }),
        Animated.timing(textAnimatedValues[index], {
          toValue: 1,
          duration: 5500,
          useNativeDriver: false,
        }),
      ])
    );

    Animated.stagger(200, animations).start();
  }, []);

  return (
    <View style={{ width: "100%", padding: 20 }}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: 800, fontSize: 16 }}>
          {users[0]?.type === "collector"
            ? "Collector stats"
            : "Accumulator stats"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("allStatsScreen")}>
          <Text style={{ color: "#93C572" }}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {users.map((user, index) => {
          let score =
            ((user?.rating / (user?.nbrRaters * 5)) * 100 * 230) / 100;
          // console.log(score);
          return (
            <View key={index} style={styles.barContainer}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    height: 30,
                    width: animatedValues[index]?.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, score || 10],
                    }),
                    backgroundColor:
                      user?.type === "collector" ? "#93C572" : "orange",
                  },
                ]}
              />
              <Animated.Text
                style={{
                  position: "absolute",
                  left: score * 0.7 || 0,
                  color: "white",
                  fontWeight: "800",
                  fontSize: 16,
                  opacity: score ? textAnimatedValues[index] : 0,
                }}
              >
                {((user?.rating / (user?.nbrRaters * 5)) * 100).toFixed(0)}
                %
              </Animated.Text>
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
