import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef } from "react";
import { useEffect } from "react";

const AllstatsScreen = () => {
    const [collectorsUsers, setCollectorsUsers] = useState([]);
    const [accumulatorsUsers, setAccumulatorUsers] = useState([]);
    const [color,setColor]=useState(false)
    console.log(color);
    // const [images,setImages]=useState([])
    // console.log(collectorsUsers);
    
  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        try {
          const usersReference = collection(FIREBASE_DB, "users");
          const q = query(usersReference, orderBy("rating", "desc"));
          let collector = [];
          let accumulator = [];
          await getDocs(q).then((snapshot) => {
            snapshot.docs.forEach((doc, index) => {
              if (doc.data()?.type === "collector") {
                collector.push({ ...doc.data(), id: doc.id });
              }
              if (doc.data()?.type === "accumulator") {
                accumulator.push({ ...doc.data(), id: doc.id });
              }
            
            });
            setCollectorsUsers(collector);
            setAccumulatorUsers(accumulator);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }, [])
  );
  const images = [collectorsUsers[0]?.photoURL, collectorsUsers[1]?.photoURL, collectorsUsers[2]?.photoURL];



  const animatedValues = useRef(
    images.map(() => {
      return new Animated.Value(0);
    })
  ).current;
  console.log("thisanimated values  ", animatedValues);

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
      <View style={styles.container}>
        {collectorsUsers.map((user, index) => {
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

export default AllstatsScreen;

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
  
