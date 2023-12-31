import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CollectorScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      {/* <View style={styles.backContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={20} color={"white"} />
          <Text
            style={{
              textAlign: "right",
              color: "white",
              fontSize: 20,
              marginRight: 10,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.imageContainer}>
        <Image source={require("../assets/collector.png")} style={{width:"100%"}} />
      </View>
      <View style={styles.textContainer}>
        <View style={{flexDirection:"row" ,alignItems:"center"}}>
            <Icon name="bottle-wine-outline" color={"green"} size={30} />
            <Text>hello bango is the best person in </Text>
            </View>
            <View style={{flexDirection:"row" ,alignItems:"center"}}>
            <Icon name="bottle-wine-outline" color={"green"} size={30} />
            <Text>hello bango is the best person in </Text>
            </View>
            <View style={{flexDirection:"row" ,alignItems:"center"}}>
            <Icon name="bottle-wine-outline" color={"green"} size={30} />
            <Text>hello bango is the best person in </Text>
            </View>
            <View style={{flexDirection:"row" ,alignItems:"center"}}>
            <Icon name="bottle-wine-outline" color={"green"} size={30} />
            <Text>hello bango is the best person in the</Text>
            </View>

      </View>
      <View style={{width:"100%",marginTop:20}}>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("accumulator")}} >
        <Text style={{textAlign:"right",color:"white",fontSize:20,marginRight:10}}  > Next </Text> 
        <Icon 
        name="arrow-right"
        size={20}
        color={"white"}
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CollectorScreen;

const styles = StyleSheet.create({
  backContainer: {
    // backgroundColor:"red",
    // padding:20
  },
  backButton: {
    backgroundColor: "#93C572",
    width: "40%",
    padding: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  textContainer:{
    padding:15,
    // backgroundColor:"red", 
    height:"35%",
    gap:20
  },
  button:{
    backgroundColor:"#93C572",
    width:"40%", 
    padding:10,
    alignSelf:"flex-end", 
    flexDirection:"row", 
    gap:7,
    alignItems:"center"
  }
});
