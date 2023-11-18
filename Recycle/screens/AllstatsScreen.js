import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { View, StyleSheet, Image, Text } from "react-native";
import {FIREBASE_AUTH, FIREBASE_DB} from "../firebaseConfig"

const AllstatsScreen = () => {
  const [allUsers, setAllUsers] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          const usersReference = collection(FIREBASE_DB, "users");
          const q = query(usersReference, orderBy("rating", "desc"));
          let users = [];
          await getDocs(q).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              users.push({ ...doc.data(), id: doc.id });
            });
            setAllUsers(users);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }, [])
  );

  return (
    <View style={{ width: "100%", padding: 20,gap:30 }}>
      <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}> 
            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <View style={{width:20,height:20,backgroundColor:"#93C572",borderRadius:10}}></View>
              <Text>Collector</Text>
            </View>
            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <View style={{width:20,height:20,backgroundColor:"orange",borderRadius:10}}></View>
              <Text>Accumulator</Text>
            </View>
            <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
              <View style={{width:20,height:20,backgroundColor:"lightgrey",borderRadius:10}}></View>
              <Text>You</Text>
            </View>
            


      </View>


      <View style={styles.container}>
        {allUsers.map((user, index) => {
          let score = (((user?.rating / (user?.nbrRaters * 5)) * 100) * 230) / 100;
          return (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: 30,
                    width: score,
                    backgroundColor: user.uid===FIREBASE_AUTH.currentUser.uid? "lightgrey"  :user?.type==="collector"?"#93C572":"orange"
                  },
                ]}
              />
              <Image
                source={{ uri: user.photoURL }}
                style={styles.image}
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
