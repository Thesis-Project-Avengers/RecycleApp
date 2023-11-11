import { useFocusEffect } from "@react-navigation/native";
import { query } from "firebase/database";
import { collection, getDocs, orderBy, where } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { FIREBASE_DB, FIREBASE_AUTH } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import OneReview from "../components/OneReview";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("reviews loaded", reviews);
  useFocusEffect(
    useCallback(() => {
      const getReviewoFcurentUser = async () => {
        // console.log("inside secndond fucn", FIREBASE_AUTH.currentUser?.uid);
        try {
          const userCollectionRef = collection(FIREBASE_DB, "reviews");
          const q = query(
            userCollectionRef,
            where("to", "==", FIREBASE_AUTH.currentUser?.uid)
          );
          await getDocs(q).then((snapshot) => {
            console.log(snapshot.docs, "hi");
            const data = [];
            snapshot.docs.forEach((doc, index) => {
              data.push({ id: doc.id, ...doc.data() });
            });
            let sortedReviews = data.sort((a, b) => b.createdAt - a.createdAt);
            // setihookreviews
            setReviews(sortedReviews);
            setLoading(false);
          });
        } catch (error) {
          console.log(error);
        }
      };
      getReviewoFcurentUser();
    }, [])
  );

  if (!loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {reviews.map((review, index) => (
            <OneReview key={index} review={review} />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading</Text>
      </View>
    );
  }
};

export default Reviews;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
