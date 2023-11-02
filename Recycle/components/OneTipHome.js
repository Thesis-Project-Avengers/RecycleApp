import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeTipes = () => {
  return (
    //articales titles
      <View style={styles.articles}>
        <View style={styles.oneArticleContainer}>
          <Image  source={{
          uri: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321",
        }} style={styles.oneImage} />
          <View style={styles.oneArticleText}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>Recycling</Text>
            <Text style={{ fontSize: 12 }}>Recycling is...</Text>
          </View>
        </View>
        <View style={styles.oneArticleContainer}>
          <Image source={{
          uri: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321",
        }} style={styles.oneImage} />
          <View style={styles.oneArticleText}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>
              How recycling works 
            </Text>
            <Text style={{ fontSize: 12 }}>
              In an effect to boost recycling ...
            </Text>
          </View>
        </View>
        </View>
 
  );
};

export default HomeTipes;
const styles = StyleSheet.create({
  
  articles: {
    flexDirection: "Column",
    justifyContent: "start",
    gap: 5,
    margin: 5,
  },
  oneArticleContainer: {
    flexDirection: "row",
    justifyContent: "start",
    gap: 10,
   
   
  },
  oneArticleText: {
    flexDirection: "column",
    justifyContent: "start",
    margin: 8,
    
  },
  oneImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#eef",
  },
});
