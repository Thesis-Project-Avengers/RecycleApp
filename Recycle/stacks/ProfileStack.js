import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import EditProfileScreen from "../screens/EditProfileScreen";
import TransactionScreen from "../screens/TransactionScreen";
import MyCodeQr from "../screens/MyCodeQr";
import UserFavouritesTipsScreen from "../screens/UserFavouritesTipsScreen";
import ConvertionScrenn from "../screens/ConvertionScrenn";





const Stack = createNativeStackNavigator();
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
          options={{
            headerShown: true,
            title: "My Transaction",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="myFavourites"
          component={UserFavouritesTipsScreen}
          options={{
            headerShown: true,
            title: "My Favourites",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="convertion"
          options={{ headerShown: true }}
          component={ConvertionScrenn}
        />
      </Stack.Navigator>
    );
  };