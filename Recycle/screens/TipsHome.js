import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import OneTipHome from "../components/OneTipHome";

const TipsHome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.articlesContainer}>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Tips</Text>
          <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
          <Text style={{ fontSize: 13, color: "#93C572" }}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView  horizontal  
      pagingEnabled showsHorizontalScrollIndicator={false} style={{ margin: 3,gap: 1 }}>
        
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
          <OneTipHome />
        
        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
};

export default TipsHome;

export const styles = StyleSheet.create({
//   container:{
// backgroundColor: 'red'
//   },
  articlesContainer: {
    flexDirection: "column",
    gap: 2,
    padding: 1,
    marginBottom: 10
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 230,
    alignItems: "center",
    margin: 1,
    padding:5
  },
 
});
