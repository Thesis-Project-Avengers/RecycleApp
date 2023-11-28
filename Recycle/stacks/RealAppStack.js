import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import HomeScreen from "../screens/HomeScreen";
import Map from "../screens/Map";
import ChatScreen from "../screens/ChatScreen";
import { ProfileStack } from "./ProfileStack";
import { TipsStack } from "./TipsStack";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = AnimatedTabBarNavigator();

export const RealApp = ({ route }) => {
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
          initialParams={{ first: route.params?.first }}
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
        //   here
        />
      </Tab.Navigator>
    );
  };
