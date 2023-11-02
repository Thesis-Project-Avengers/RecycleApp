import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainerHome}>
      <View style={styles.text}>
        <Text style={{ fontSize: 20, fontWeight: 900, color: "green" }}>
          Hi,Clawrence!
        </Text>
        {/* <Text style={{ fontSize: 15, color: "black" }}>
          Let's Contribute to our earth
        </Text> */}
      </View>
      <View style={styles.Icons}>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <Icon name="shopping-cart" size={28} />
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 5 }}>
      <Icon name="dollar-sign" size={28} />
     </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    alignItems: "center",
    margin: 5,

  },
  text: {
    flexDirection: "column",
  },
  Icons: {
    flexDirection:"row",
    gap:20
  }
});
