import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const OnePosition = ({loc,setselectedPos}) => {
    
  return (
    <Marker
    //   onPress={setselectedPos({
    //     latitude: loc.location.latitude,
    //     longitude: loc.location.longitude,
    //   })}
      onPress={()=>{setselectedPos(loc.location);}}
      coordinate={{
        latitude: loc.location.latitude,
        longitude: loc.location.longitude,
      }}
      pinColor={"black"}
    >
      <Icon name="bottle-soda" size={40} color={"#73d905"} />
    </Marker>
  );
};

export default OnePosition;
