import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import React, { useCallback, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { FIREBASE_DB } from "../firebaseConfig";
import { query } from "firebase/database";
import OneTip from "../components/OneTip";

const ProfileVisitor = ({ route }) => {
  const [tips, setTips] = useState([]);
  // console.log(tips);
  const { user } = route.params;
  useFocusEffect(
    useCallback(() => {
      const refrence = collection(FIREBASE_DB, "Tips");
      const q = query(refrence, where("posterId", "==", user?.uid));
      getDocs(q).then((querySnapshot) => {
        const tipsData = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          tipsData.push(data);
        });
        setTips(tipsData);
      });
      // setLoading(false);
    }, [])
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color="gold"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };
  return (
    <SafeAreaView style={{ padding: 10}}>
          <ScrollView 
       
       pagingEnabled
       showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20,height:"auto" }}>
      <View style={styles.imageContainerText}>
        <Image style={styles.imageProfile} source={{ uri: user.photoURL }} />
        <Text>{user.displayName}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          alignSelf: "center",
        }}
      >
        {renderStars(user?.rating / 5 || 1)}
      </View>
      <View style={{height:30}}>
        <Text style={{fontSize:16}} >Tips</Text>
        </View>
        {tips.map((tip) => (
          <OneTip key={tip.id} tip={tip} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileVisitor;
const styles = StyleSheet.create({
  imageContainerText: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    // marginTop:"10%"
  },
  imageProfile: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});
