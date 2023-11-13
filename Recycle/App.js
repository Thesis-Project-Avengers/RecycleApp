import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./components/OnBroadingScreen";
import HomeScreen from "./screens/HomeScreen";
import Map from "./screens/Map";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import SignIn from "./screens/SignIn";
import ConfirmCode from "./screens/ConfirmCode";
import ChatScreen from "./screens/ChatScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import Profile from "./screens/Profile";
import TipsScreen from "./screens/TipsScreen";
import FormAfterAuth from "./screens/FormAfterAuth";
import ChooseScreen from "./screens/ChooseScreen";
import CollectorScreen from "./screens/CollectorScreen";
import AccumulatorScreen from "./screens/AccumulatorScreen";
import ProfileCollector from "./screens/ProfileCollector";
import AccSpendPointScreen from "./screens/AccSpendPointScreen";
import Reviews from "./screens/Reviews";

import AccOnboarding from "./components/AccOnboarding";
import CommentsScreen from "./screens/CommentsScreen";
import CollOmbording from "./components/CollOmbording";
import TransactionScreen from "./screens/TransactionScreen";
import SpecificChatScreen from "./screens/SpecificChatScreen";
import ProfileVisitor from "./screens/ProfileVisitor";
import MyCodeQr from "./screens/MyCodeQr";
import ScanQR from "./screens/ScanQR";
import AllstatsScreen from "./screens/AllstatsScreen";

const Stack = createNativeStackNavigator();
const Tab = AnimatedTabBarNavigator();
export default function App() {
  // console.log(FIREBASE_AUTH.currentUser?.displayName);
  //Onboarding
  // const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(true)
  const [first, setFirst] = useState(true);
  const fetch = async () => {
    const x = await AsyncStorage.getItem("first");
    // console.log(x);
    if (!x) {
      setFirst(false);
    } else {
      AsyncStorage.setItem("first", "false");
    }
    // const appData = await AsyncStorage.getItem("isAppFirstLaunched")
    // console.log(appData);
    // if (appData == true) {
    //   setIsAppFirstLaunched(false)
    //   AsyncStorage.setItem('isAppFirstLaunched', 'false')
    // } else {
    //   setIsAppFirstLaunched(true)
    //   AsyncStorage.setItem('isAppFirstLaunched', 'true')
    // }
  };
  React.useEffect(() => {
    fetch();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"App"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ombording" component={OnboardingScreen} />
        <Stack.Screen name="auth" component={AuthStack} />
        <Stack.Screen name="App" component={RealApp} />
        <Stack.Screen
          name="profileVisitor"
          component={ProfileVisitor}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="allStatsScreen" component={AllstatsScreen} options={{headerShown:true,title:"Ranks",headerTitleAlign:"center"}} />
        <Stack.Screen name="Reviews" component={Reviews} options={{headerShown:true,title:"My Reviews",headerTitleAlign:"center"}} />
        <Stack.Screen name="QrScanner" component={ScanQR} />
        <Stack.Screen
          name="specificChat"
          component={SpecificChatScreen}
          options={{ headerShown: true, title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="signIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="confirmCode" component={ConfirmCode} />
      <Stack.Screen name="formAfterAuth" component={FormAfterAuth} />
      <Stack.Screen name="chooseScreen" component={ChooseScreen} />
      <Stack.Screen name="collector" component={CollectorScreen} />
      <Stack.Screen name="accumulator" component={AccumulatorScreen} />
      <Stack.Screen name="profileCollector" component={ProfileCollector} />
      <Stack.Screen name="accQuestions" component={AccOnboarding} />
      <Stack.Screen name="collQuestions" component={CollOmbording} />
    </Stack.Navigator>
  );
};
export const RealApp = ({route}) => {
  // console.log(route.params.first);
  return (
    <Tab.Navigator
      appearance={{
        tabBarBackground: "#f7f6f6",
        shadow: true,
        tabButtonLayout: "horizontal",
        dotCornerRadius: 15,
      }}
      tabBarOptions={{
        activeBackgroundColor: "#93C572",
        activeTintColor: "white",
        inactiveTintColor: "#222222",
      }}
      
    >
      <Tab.Screen
       initialParams={{first:route.params?.first}}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
              // color={color}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="lightbulb-o"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
        name="Tips"
        component={TipsStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="map"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
        name="Map"
        component={Map}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="comment"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
        name="Chat"
        component={ChatScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="user"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="mainprofile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="mainprofile" component={Profile} />
      <Stack.Screen name="editprofile" component={EditProfileScreen} />
      <Stack.Screen
        name="transaction"
        component={TransactionScreen}
        options={{ headerShown: true, title: "My Transaction" }}
      />
      <Stack.Screen
        name="mycodeQr"
        component={MyCodeQr}
        options={{ headerShown: true, title: "My Transaction" }}
      />
    </Stack.Navigator>
  );
};

export const TipsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tipsMain" component={TipsScreen} />
      <Stack.Screen
        name="commentScreen"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: true,
          title: "Comments",
        }}
      />
    </Stack.Navigator>
  );
};


