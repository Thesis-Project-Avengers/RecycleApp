import { View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const RatingProfile = ({ user }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color="gold"
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return stars;
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {renderStars(user?.rating / 5 || 1)}
      </View>
    </View>
  );
};

export default RatingProfile;
