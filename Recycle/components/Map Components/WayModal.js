import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
const WayModal = ({currentInformation}) => {
  const API_KEY = "AIzaSyCz7OmCHc00wzjQAp4KcZKzzNK8lHCGkgo";

  return <View style={styles.addModalContent}>
 <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          marginVertical:5,
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Icon
            name="map-marker-distance"
            size={30}
            color={"#93C572"}
            style={{
              marginRight: 5,
              marginLeft: 5,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.distance?.text}
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Icon
            name="timer-outline"
            size={10}
            color={"#93C572"}
            style={{
              marginLeft: 20,
              marginRight: 5,
              fontSize: 40,
            }}
          />
          <Text style={{ fontSize: 20 }}>
            {currentInformation?.duration.text}
          </Text>
        </View>
        
      </View>
      {
        currentInformation.distance.value === 90 ?
        <Text style={{color:"black"}}>
                 too Close
            </Text>: currentInformation.distance.value === 1 ? 
     
       <TouchableOpacity style={{backgroundColor:"#93C572",paddingHorizontal:20,paddingVertical:10,borderRadius:50}}>
            <Text style={{color:"white"}}>
                 Claim Now
            </Text>
        </TouchableOpacity> : null }
  </View>;
};

export default WayModal;
const styles = StyleSheet.create({
  addModalContent: {
    height: "",
    width:"100%",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 50,
    marginTop:"10%",
    position: "absolute",
    top: 0,
    flexDirection:"column"
  },
});