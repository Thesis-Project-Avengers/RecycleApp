import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPeopleCarryBox, faRecycle } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
// import FontAwesome6 from "react-native-vector-icons/FontAwesome6Pro";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/AntDesign";
import Icon6 from "react-native-vector-icons/Fontisto";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import RatingProfile from "../components/RatingProfile";
import OneReview from "../components/OneReview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  // console.log("this is the height of the",height);
  const [userProfileInfo, setProfileInfo] = useState({});
  const [reviews, setReviews] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        // console.log("insisde user profile");
        try {
          const userDocRef = doc(
            FIREBASE_DB,
            "users",
            FIREBASE_AUTH.currentUser?.uid
          );
          await getDoc(userDocRef).then((user) => {
            setProfileInfo(user.data());
          });
        } catch (error) {
          console.log(error);
        }
      };
      const getReviewOfCurentUser = async () => {
        try {
          const userCollectionRef = collection(FIREBASE_DB, "reviews");
          const q = query(
            userCollectionRef,
            where("to", "==", FIREBASE_AUTH.currentUser?.uid)
          );
          await getDocs(q).then((snapshot) => {
            const data = [];
            snapshot.docs.forEach((doc, index) => {
              if (index < 2) {
                data.push({ id: doc.id, ...doc.data() });
              }
            });
            setReviews(data);
          });
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
      getReviewOfCurentUser();
    }, [])
  );
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            minHeight: "auto",
            // userProfileInfo.type === "collector" ? height : height * 1.2,
          },
        ]}
      >
        <View style={styles.returnPoints}>
          {userProfileInfo.type === "collector" ? (
            <FontAwesomeIcon
              icon={faPeopleCarryBox}
              size={30}
              color="#93C572"
            />
          ) : (
            <FontAwesomeIcon icon={faRecycle} size={30} color="#93C572" />
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("convertion");
            }}
          >
            <View style={styles.points}>
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 16 }}
              >
                {userProfileInfo?.points}
              </Text>

              <Image
                source={require("../assets/coin.png")}
                style={styles.imageCoin}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.imageTextName}>
          <Image
            source={{ uri: userProfileInfo?.photoURL }}
            style={styles.imageProfile}
          />
          <Text style={styles.textName}>{userProfileInfo?.displayName}</Text>

          <RatingProfile userProfileInfo={userProfileInfo} />

          {/* badge w rating  */}
        </View>
        <View style={styles.statContainer}>
          <View style={styles.oneRec}>
            <Icon name="bottle-wine-outline" size={45} color={"#93C572"} />
            <Text>20</Text>
          </View>
          <View style={styles.oneRec}>
            <Icon2 name="people-arrows" size={40} color={"#93C572"} />
            <Text>35</Text>
          </View>
          <View style={styles.oneRec}>
            <Icon3 name="money-bill-wave" size={40} color={"#93C572"} />
            <Text>100</Text>
          </View>
        </View>

        {/* hne bech thot zouz review  */}
        {userProfileInfo?.type === "accumulator" && (
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={{ fontSize: 20, fontWeight: 700 }}>Reviews</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", gap: 5 }}
                onPress={() => {
                  navigation.navigate("Reviews");
                }}
              >
                <Text style={{ fontSize: 13, color: "#93C572" }}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              contentContainerStyle={{ gap: 20 }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {reviews.map((review, index) => (
                <OneReview key={index} review={review} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Here The Favourites Tips  */}

        <View style={{ marginBottom: 25 }}>
          {userProfileInfo?.type === "accumulator" && (
            <View style={styles.oneButton}>
              <Icon4 name="back-in-time" size={20} color={"#93C572"} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("transaction");
                }}
              >
                <Text style={{ fontSize: 17 }}>My Requests</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.oneButton, { marginLeft: 5 }]}>
            <Icon6 name="favorite" size={20} color={"#93C572"} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("myFavourites");
              }}
            >
              <Text style={{ fontSize: 17 }}>My Favourites</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.oneButton}>
            <Icon5 name="qrcode" size={20} color={"#93C572"} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("mycodeQr");
              }}
            >
              <Text style={{ fontSize: 17 }}>My Qr Code</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("editprofile");
            }}
          >
            <View style={styles.oneButton}>
              <Icon5 name="edit" size={20} color={"#93C572"} />
              <Text style={{ fontSize: 17 }}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              FIREBASE_AUTH.signOut();
              AsyncStorage.setItem("isFirst", "false");
              navigation.navigate("auth");
            }}
          >
            <View style={styles.oneButton}>
              <Icon name="logout" size={20} color={"#93C572"} />
              <TouchableOpacity>
                <Text style={{ fontSize: 17 }}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/* <View style={styles.oneButton}>
            <Icon name="logout" size={20} color={"#93C572"} />
            <TouchableOpacity>
              <Text style={{ fontSize: 17 }}>Delete Account</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  imageCoin: {
    width: 20,
    height: 20,
  },
  returnPoints: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:"red",
    padding: 5,
    alignContent: "center",
  },
  points: {
    backgroundColor: "#93C572",
    borderRadius: 20,
    padding: 5,
    width: 90,
    textAlign: "center",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  return: {
    padding: 15,
    width: 90,
    textAlign: "center",
  },
  imageTextName: {
    // backgroundColor:"red",
    gap: 10,
  },
  imageProfile: {
    alignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  textName: {
    alignSelf: "center",
    fontSize: 18,
  },
  statContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    padding: 10,
    marginTop: 10,
    justifyContent: "space-around",
    height: "20%",
    alignItems: "center",
  },
  oneRec: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    padding: 15,
    gap: 10,
    height: "100%",
  },
  scroll: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    // minHeight:1200,
    // backgroundColor:"red",
    // gap:30
  },
  oneButton: {
    // backgroundColor:"green",
    width: "100%",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  container: {
    padding: 10,
    // backgroundColor: "green",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 165,
    alignItems: "center",
    margin: 1,
    padding: 5,
  },
});
