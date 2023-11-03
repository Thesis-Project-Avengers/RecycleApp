import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const OneTipHome = () => {
  return (
    //articales titles
     
        <View style={styles.oneTipsContainer}>
          
          <Image  source={{
          uri: "https://scontent.ftun9-1.fna.fbcdn.net/v/t39.30808-6/347253762_632332375434169_2230005292919228659_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kq-7lFGMHY8AX_Vvp9L&_nc_ht=scontent.ftun9-1.fna&oh=00_AfD61NRsgJU3pfxXDGKzJoC0IGJIcoaQHLZNc-FmkR6rBw&oe=6545A321",
        }} style={styles.oneImage} />
          <View style={styles.oneTipsText}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>belhassan</Text>
            <Text style={{ fontSize: 12 }}>Recycling is...</Text>
          </View>
        </View>
    
 
  );
};

export default OneTipHome;
const styles = StyleSheet.create({
  
  oneTipsContainer: {
    width:310,
    height:150,
    gap: 2,
    margin:5,
    flexDirection: "row",
    display:"flex",
    justifyContent: "start",
    alignItems: "center",
   backgroundColor:"#93C572",
   borderRadius: 10,
  },
  oneTipsText: {
    flexDirection: "column",
    justifyContent: "start",
    margin: 8,
    
  },
  oneImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    // borderWidth: 3,
    // borderColor: "#eef",
    
  },
});
