import Onboarding from "react-native-onboarding-swiper";
import React from "react";
import { Image, StyleSheet } from "react-native";

const OnBroadingScreen = () => {
  const pages = [
    {
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
      title: "Explore",
      subtitle: "Explore and enjoy our app's many features.",
      image: (
        <Image
          source={require("../assets/navigation.png")}
          style={styles.imageStyle}
        />
      ),
    },
  ];

  return <Onboarding pages={pages} 
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

// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Dimensions,
//   StatusBar,
//   FlatList,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// const { width, height } = Dimensions.get("window");
// const COLORS = { primary: "white", white: "green" };
// const slides = [
//   {
//     id: "1",
//     image: require("../assets/recycle.png"),
//     title: "nice",
//     subtitle: "Grow your business",
//   },
//   {
//     id: "2",
//     image: require("../assets/placeholder.png"),
//     title: "accumulator",
//     subtitle: "Grow your business",
//   },
//   {
//     id: "3",
//     image: require("../assets/navigation.png"),
//     title: "new",
//     subtitle: "Grow your business",
//   },
// ];
// const Slide = ({ item }) => {
//   return (
//     <View style={{ flex:1,alignItems: "center",justifyContent:"center" }}>
//       <Image
//         source={item.image}
//         style={{ height: "50%", width, resizeMode: "contain" }}
//       />
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.subtitle}>{item.subtitle}</Text>
//     </View>
//   );
// };
// const OnboardingScreen = ({ navigation }) => {
//   const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
//   const ref = React.useRef(null);
//   const Footer = () => {
//     return (
//       <View
//         options={{ headerShown: false }}
//         style={{
//           height: height * 0.25,
//           justifyContent: "center",
//           paddingHorizontal: 20,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "center",
//             maringTop: 20,
//           }}
//         >
//           {slides.map((_, index) => (
//             <View key={index}
//               style={[
//                 styles.indicator,
//                 currentSlideIndex == index && {
//                   backgroundColor: COLORS.white,
//                   width: 25,
//                 },
//               ]}
//             />
//           ))}
//         </View>
//         <View style={{ marginBottom: 20 }}>
//           {currentSlideIndex == slides.length - 1 ? (
//             <View style={{ height: 50 }}>
//               <TouchableOpacity style={[styles.btn]} onPress={()=>navigation.navigate("auth")}>
//                 <Text style={{ fontWeight: "bold", fontSize: 15 }}>
//                   GET sTARTED
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={{ flexDirection: "row" }}>
//               <TouchableOpacity
//                 onPress={skip}
//                 style={[
//                   styles.btn,
//                   {
//                     backgroundColor: "transparent",
//                     borderWidth: 1,
//                     borderColor: COLORS.white,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: 15,
//                     color: COLORS.white,
//                   }}
//                 >
//                   SKIP
//                 </Text>
//               </TouchableOpacity>
//               <View style={{ width: 15 }} />
//               <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
//                 <Text style={{ fontWeight: "bold", fontSize: 15 }}>Next</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };
//   const updateCurrentSlideIndex = (e) => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(currentIndex);
//     console.log(contentOffsetX);
//   };
//   const goNextSlide = () => {
//     const nextSlideIndex = currentSlideIndex + 1;
//     if (nextSlideIndex != slides.length) {
//       const offset = nextSlideIndex * width;
//       ref?.current.scrollToOffset({ offset });
//       setCurrentSlideIndex(nextSlideIndex);
//     }
//   };
//   const skip = () => {
//     const lastSlideIndex = currentSlideIndex - 1;
//     if (lastSlideIndex != slides.length) {
//       const offset = lastSlideIndex * width;
//       ref?.current.scrollToOffset({ offset });
//       setCurrentSlideIndex(lastSlideIndex);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
//       <StatusBar backgroundColor={COLORS.primary} />
//       <FlatList
//         ref={ref}
//         onMomentumScrollEnd={updateCurrentSlideIndex}
//         pagingEnabled
//         data={slides}
//         contentContainerStyle={{ height: height * 0.75 }}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => <Slide item={item} />}
//       />
//       <Footer />
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   title: {
//     color: COLORS.white,
//     fontSize: 22,
//     fontWeight: "bold",
//     // maringTop: 20,
//     textAlign: "center",
//   },
//   subtitle: {
//     color: COLORS.white,
//     fontSize: 13,
//     // maringTop: 10,
//     maxWidth: "70%",
//     textAlign: "center",
//     lineHeight: 23,
//   },
//   indicator: {
//     height: 5,
//     width: 15,
//     backgroundColor: "grey",
//     marginHorizontal: 3,
//     borderRadius: 2,
//     top: "-10%",
//   },
//   btn: {
//     flex: 1,
//     height: 50,
//     borderRadius: 2,
//     backgroundColor: COLORS.white,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default OnboardingScreen;
