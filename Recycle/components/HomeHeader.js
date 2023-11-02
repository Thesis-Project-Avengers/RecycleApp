import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainerHome}>
      <View style={styles.text}>
        <Text style={{ fontSize: 20, fontWeight: 900, color: "#73d90" }}>
          Hi,Clawrence!
        </Text>
        <Text style={{ fontSize: 15, color: "black" }}>
          Let's Contribute to our earth
        </Text>
      </View>
      <Icon name="menu" size={28} />
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 80,
    alignItems: "center",
    margin: 10,
  },
  text: {
    flexDirection: "column",
  },
});
