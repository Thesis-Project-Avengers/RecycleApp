// import { View, Text, StyleSheet, Image } from "react-native";
// import React from "react";

// const Stats = () => {
//   // const data = [{ value: 30 }, { value: 80 }, { value: 90 }];
//   const images = [
//     require("../assets/balha.jpg"),
//     require("../assets/khalil.jpg"),
//     require("../assets/bango.jpg"),
//     require("../assets/accumulator.png"),
//     require("../assets/accumulator.png"),
//   ];
//   const val = 50
//   return (
//     <View style={{ width: "100%",padding:20 }}>
//         <View style={{marginBottom:20}}>
//         <Text>Collector Stats</Text>
//         </View>
//       <View style={styles.containerr}>
//         <View key={1} style={styles.barContainer}>
//           <View style={[styles.bar, { height: 30, width: 230 }]} />
//           <Image source={images[1]} style={styles.image} />
//         </View>
//         <View key={0} style={styles.barContainer}>
//           <View style={[styles.bar, { height: 30, width: val*3 }]} />
//           <Image source={images[0]} style={styles.image} />
//         </View>
//         <View key={2} style={styles.barContainer}>
//           <View style={[styles.bar, { height: 30, width: 100 }]} />
//           <Image source={images[2]} style={styles.image} />
//         </View>
//         <View key={3} style={styles.barContainer}>
//           <View style={[styles.bar, { height: 30, width: 100 }]} />
//           <Image source={images[3]} style={styles.image} />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Stats;
// const styles = StyleSheet.create({
//   containerr: {
//     backgroundColor: "#eee",
//     flexDirection: "column",
//     alignItems: "flex-end",
//     gap:15
//     // height:100
//   },
//   barContainer: {
//     flexDirection: "row",
//     width: "100%",
//     alignItems: "center",
//     gap:20,
//     // justifyContent: "space-between",

//     marginRight: 10, // Spacing between bars
//   },
//   bar: {
//     backgroundColor: "#93C572", // Bar color
//     // width: 300, // Bar width,
//     // flexDirection:"row",
//     // borderRadius: 10,
//     borderTopRightRadius:15, // Optional: Adds rounded corners to the bar
//     borderBottomRightRadius:15
// },
//   image: {
//     width: 30, // Image width
//     height: 30, // Image height
//     resizeMode: "contain", // Adjust the image content mode as needed
//     marginBottom: 5, // Optional: Adds spacing between the image and the bar
//     borderRadius:50
//   },
// });
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
