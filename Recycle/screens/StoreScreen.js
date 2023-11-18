import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGift, faShop } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
const StoreScreen = () => {
  const [user, setUser] = useState({});
  useFocusEffect(
    useCallback(() => {
      FIREBASE_AUTH.onAuthStateChanged((user) => {
        if (user) {
          const userDocRef = doc(FIREBASE_DB, "users", user?.uid);
          getDoc(userDocRef).then((user) => {
            setUser(user.data());
          });
        } else {
          // No user is signed in
          console.log("No user is signed in");
        }
      });
    }, [])
  );
  return (
    <SafeAreaView style={{ padding: 20, gap: 20 }}>
      <View style={styles.header}>
        <Animatable.View animation="bounce" iterationCount="infinite">
          <FontAwesomeIcon icon={faShop} size={40} bounce color="#93C572" />
        </Animatable.View>
        <View style={styles.point}>
          <Text style={{ fontSize: 15, color: "#fff" }}>{user.points}</Text>
          <Image
            source={require("../assets/coin.png")}
            style={styles.imageCoin}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 ,height:3000}}>
        <View
          style={{
            backgroundColor: "#eee",
            height: 350,
            //
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 5,
            margin: 4,
          }}
        >
          <View style={{ height: 200 }}>
            <Image
              source={require("../assets/netflix.png")}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 12,
                // left: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                justifyContent: "space-between",
                width: "100%",
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 3,
                  backgroundColor: "#93C572",
                  padding: 5,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "900" }}>900</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={styles.imageCoin}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#93C572",
                  padding: 5,
                  borderRadius: 20,
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <Ionicons name="time" size={20} color={"#fff"} />
                <Text style={{ color: "#fff", fontWeight: 900 }}>
                  04d 15h 10m 10s
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                gap: 5,
                backgroundColor: "#fff",
                height: "77%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                  lineHeight: 30,
                }}
              >
                70% Off Netflix Subscription && Enjoy Movies
              </Text>
              <Text
                style={{
                  color: "red",
                  opacity: 0.5,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                1 Month
              </Text>
              <View style={{ width: "100%", gap: 110, flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../assets/khalil.jpg")}
                    style={{
                      position: "absolute",
                      left: 10,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 30,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/bango.jpg")}
                    style={{
                      position: "absolute",
                      left: 50,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 70,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 30,
                  }}
                >
                  <Text>+(Others)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: 800 }}>
              Recharge Carts
            </Text>
          </View>
          <View style={styles.oneCard}>
            <View
              style={{ width: "40%", height: "100%", borderRightWidth: 0.2 }}
            >
              <View style={{ position: "absolute", left: 10, top: 10 , flexDirection:"row",alignItems:"center",gap:7,backgroundColor:"#93C572",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}>
                <Text style={{color:"white"}}>50</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={{
                    height: 20,
                    width: 20,
                    objectFit: "contain",
                    borderRadius: 10,
                  }}
                />
              </View>
              <Image
                source={require("../assets/tt.png")}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </View>
            <View style={{padding:10,gap:7,width:"60%"}}>
                <Text style={{fontSize:16,fontWeight:800,color:"#1AABDD"}}>Tunisie Telecom </Text>
                <Text>1DT ticket </Text>
                <View style={{flexDirection:"row",gap:5,alignItems:"center",}}>
                    <Text style={{fontWeight:500}}>Enjoy</Text>
                <AntDesign name="phone" size={13} color={"green"}/>
                </View>
                <View style={{padding:10}}>
                <TouchableOpacity style={{backgroundColor:"#93C572",padding:10,borderRadius:10,width:100,alignSelf:"flex-end",alignItems:"center"}}>
                    <Text style={{color:"white"}}>Purshase</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
          <View style={styles.oneCard}>
            <View
              style={{ width: "40%", height: "100%", borderRightWidth: 0.2 }}
            >
              <View style={{ position: "absolute", left: 10, top: 10 , flexDirection:"row",alignItems:"center",gap:7,backgroundColor:"#93C572",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}>
                <Text style={{color:"white"}}>50</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={{
                    height: 20,
                    width: 20,
                    objectFit: "contain",
                    borderRadius: 10,
                  }}
                />
              </View>
              <Image
                source={require("../assets/or.png")}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </View>
            <View style={{padding:10,gap:7,width:"60%"}}>
                <Text style={{fontSize:16,fontWeight:800,color:"#FE7600"}}>Orange </Text>
                <Text>1DT ticket </Text>
                <View style={{flexDirection:"row",gap:5,alignItems:"center",}}>
                    <Text style={{fontWeight:500}}>Enjoy</Text>
                <AntDesign name="phone" size={13} color={"#FE7600"}/>
                </View>
                <View style={{padding:10}}>
                <TouchableOpacity style={{backgroundColor:"#93C572",padding:10,borderRadius:10,width:100,alignSelf:"flex-end",alignItems:"center"}}>
                    <Text style={{color:"white"}}>Purshase</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
          <View style={styles.oneCard}>
            <View
              style={{ width: "40%", height: "100%", borderRightWidth: 0.2 }}
            >
              <View style={{ position: "absolute", left: 10, top: 10 , flexDirection:"row",alignItems:"center",gap:7,backgroundColor:"#93C572",paddingHorizontal:7,paddingVertical:3,borderRadius:10}}>
                <Text style={{color:"white"}}>50</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={{
                    height: 20,
                    width: 20,
                    objectFit: "contain",
                    borderRadius: 10,
                  }}
                />
              </View>
              <Image
                source={require("../assets/ore.png")}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </View>
            <View style={{padding:10,gap:7,width:"60%"}}>
                <Text style={{fontSize:16,fontWeight:800,color:"#ED1B24"}}>Ooredoo</Text>
                <Text>1DT ticket </Text>
                <View style={{flexDirection:"row",gap:5,alignItems:"center",}}>
                    <Text style={{fontWeight:500}}>Enjoy</Text>
                <AntDesign name="phone" size={13} color={"#ED1B24"}/>
                </View>
                <View style={{padding:10}}>
                <TouchableOpacity style={{backgroundColor:"#93C572",padding:10,borderRadius:10,width:100,alignSelf:"flex-end",alignItems:"center"}}>
                    <Text style={{color:"white"}}>Purshase</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#eee",
            height: 350,
            //
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 5,
            margin: 4,
          }}
        >
          <View style={{ height: 200 }}>
            <Image
              source={require("../assets/spot.png")}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 12,
                // left: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                justifyContent: "space-between",
                width: "100%",
                // backgroundColor: "red",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 3,
                  backgroundColor: "#93C572",
                  padding: 5,
                  justifyContent: "center",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "900" }}>1000</Text>
                <Image
                  source={require("../assets/coin.png")}
                  style={styles.imageCoin}
                />
              </View>
              <View
                style={{
                  backgroundColor: "#93C572",
                  padding: 5,
                  borderRadius: 20,
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <Ionicons name="time" size={20} color={"#fff"} />
                <Text style={{ color: "#fff", fontWeight: 900 }}>
                  04d 15h 10m 10s
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 8,
                gap: 5,
                backgroundColor: "#fff",
                height: "77%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                  lineHeight: 30,
                }}
              >
                70% Off Spotify Subscription && Enjoy Music
              </Text>
              <Text
                style={{
                  color: "red",
                  opacity: 0.5,
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                2 Month
              </Text>
              <View style={{ width: "100%", gap: 110, flexDirection: "row" }}>
                <View>
                  <Image
                    source={require("../assets/khalil.jpg")}
                    style={{
                      position: "absolute",
                      left: 10,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 30,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/bango.jpg")}
                    style={{
                      position: "absolute",
                      left: 50,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Image
                    source={require("../assets/balha.jpg")}
                    style={{
                      position: "absolute",
                      left: 70,
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 30,
                  }}
                >
                  <Text>+(Others)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageCoin: {
    width: 20,
    height: 20,
  },
  point: {
    width: 90,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#93C572",
    position: "relative",
    zIndex: -1,
    flexDirection: "row",
    gap: 7,
  },
  container: {
    // height:200,
    // backgroundColor:"green",
    // padding: 10,
    gap:15
  },
  oneCard: {
    height: 150,
    borderRadius: 10,
    borderWidth: 0.2,
    flexDirection:"row"

    // borderRadius:7,
    // backgroundColor:"red",
    // shadowColor: "black",
    // backgroundColor: "red", // You can uncomment this line if you want to set a background color
  },
});
