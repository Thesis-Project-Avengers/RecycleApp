import Onboarding from "react-native-onboarding-swiper";
import React from "react";
import { Image, StyleSheet } from "react-native";

const OnBroadingScreen = ({navigation}) => {
  const pages = [
    {
      backgroundColor: '#fff',
      title: "Welcome to MyApp",
      subtitle: "Discover the amazing features of our app.",
      image: (
        <Image
      
          source={require("../assets/earth.png")}
          style={styles.imageStyle}
        />
      ),
    },
    {
      backgroundColor: '#fff',

      title: "Get Started",
      subtitle: "Create an account and start using our app today.",
      image: (
        <Image
          source={require("../assets/recycle_earth.png")}
          style={styles.imageStyle}
        />
      ),
    },
    {
      backgroundColor: '#fff',
      title: "Explore",
      subtitle: "Explore and enjoy our app's many features.",
      image: (
        <Image
          source={require("../assets/recycle.png")}
          style={styles.imageStyle}
        />
      ),
    },
  ];

  return <Onboarding

  
  onDone={()=>{navigation.navigate("auth")}}
  pages={pages} 
  titleStyles={styles.titleStyle}
  subTitleStyles={styles.subtitleStyle}
  bottomBarHighlight={false} 
  bottomBarColor="green" 
  />;
};
const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  titleStyle: {
    color: 'green', 
    fontSize: 24, 
  },
  subtitleStyle: {
    color: 'green', 
    fontSize: 16,
  }
});

export default OnBroadingScreen;

