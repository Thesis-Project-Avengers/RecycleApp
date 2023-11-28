import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TipsScreen from "../screens/TipsScreen";
import CommentsScreen from "../screens/CommentsScreen";


const Stack = createNativeStackNavigator();

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