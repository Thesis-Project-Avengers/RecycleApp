import { View, Text,TouchableOpacity} from "react-native";
import React from "react";

const SearchedElement = ({getCoordinatesFromPlaceId,item,key}) => {
  return (
    <TouchableOpacity
      key={key}
      onPress={() => {
        getCoordinatesFromPlaceId(item);
      }}
    >
      <Text style={{ paddingVertical: 10 }}>{item.description}</Text>
    </TouchableOpacity>
  );
};

export default SearchedElement;
