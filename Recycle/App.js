import { RealApp } from "./stacks/RealAppStack";
import { AuthStack } from "./stacks/AuthStack";
import React, {  useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./components/OnBroadingScreen";
import Reviews from "./screens/Reviews";
import SpecificChatScreen from "./screens/SpecificChatScreen";
import ProfileVisitor from "./screens/ProfileVisitor";
import ScanQR from "./screens/ScanQR";
import AllstatsScreen from "./screens/AllstatsScreen";
import { View } from "react-native-animatable";
import { Text } from "react-native-elements";
import ReportScreen from "./screens/ReportScreen";
import StoreScreen from "./screens/StoreScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isFirst, setFirst] = useState(null); // Initialize with null as loading state
  const [isLoading, setLoading] = useState(true);
  const fetchIsFirst = async () => {
    try {
      setLoading(true);
      const state = await AsyncStorage.getItem("isFirst");
      setFirst(state);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchIsFirst();
  }, []);

  // Show a loading indicator or other UI while loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"ombording"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="ombording" component={OnboardingScreen} />
          <Stack.Screen name="auth" component={AuthStack} />
          <Stack.Screen name="App" component={RealApp} />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerShown: true,
              title: "My Reviews",
              headerTitleAlign: "left",
            }}
          />
          <Stack.Screen
            name="profileVisitor"
            component={ProfileVisitor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="allStatsScreen"
            component={AllstatsScreen}
            options={{
              headerShown: true,
              title: "Ranks",
              headerTitleAlign: "left",
            }}
          />
          <Stack.Screen name="QrScanner" component={ScanQR} />
          <Stack.Screen
            name="specificChat"
            component={SpecificChatScreen}
            options={{ headerShown: true, title: "" }}
          />
          <Stack.Screen
            name="report"
            component={ReportScreen}
            options={{ headerShown: true, headerTitleAlign: "left" }}
          />
          <Stack.Screen name="store" component={StoreScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
