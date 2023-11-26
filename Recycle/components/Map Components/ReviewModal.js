import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";

const ReviewModal = ({ currentInformation, setRateModal }) => {
  const navigation = useNavigation();
  const [rate, SetRate] = useState(0);
  const [content, SetContent] = useState("");
  console.log(content);

  const ratingCompleted = (rating) => {
    SetRate(rating);
  };

  const hundleRating = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", currentInformation?.ownerId);
      await updateDoc(docRef, {
        rating: increment(rate),
        nbrRaters: increment(1),
      });
      const rateRef = collection(FIREBASE_DB, "reviews");
      await addDoc(rateRef, {
        content: content,
        from: FIREBASE_AUTH.currentUser?.uid,
        to: currentInformation?.ownerId,
        stars: rate,
        createdAt: serverTimestamp(),
      });
      setRateModal(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.addModalContent}>
      <Text>
        <AirbnbRating
          count={5}
          defaultRating={11}
          size={20}
          onFinishRating={ratingCompleted}
        />
      </Text>
      <TextInput
        style={{
          marginVertical: 10,
          paddingLeft: 10,
          width: "100%",
          textAlign: "center",
        }}
        placeholder="Rate You Experience..."
        onChangeText={SetContent}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 50,
        }}
        onPress={() => {
          hundleRating();
        }}
      >
        <Text style={{ color: "white" }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewModal;
const styles = StyleSheet.create({
  addModalContent: {
    height: "",
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    flexDirection: "column",
  },
});
