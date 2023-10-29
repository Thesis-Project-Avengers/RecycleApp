import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ExapmleScreen from './screens/ExapmleScreen';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const Stack = createNativeStackNavigator();
const Tab = AnimatedTabBarNavigator()

export default function App() {
  return (
    <NavigationContainer >
      <Tab.Navigator
        appearance={{
          tabBarBackground: "#f7f6f6",
          shadow: true,
          tabButtonLayout: "horizontal",
          dotCornerRadius: 100,
          floating: true,
        }}
        tabBarOptions={{
          activeBackgroundColor: "#73d905",
          activeTintColor: "white",
          inactiveTintColor: "#222222"
        }}
      >

        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="home"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              // color={color}
              />
            )
          }}
          name="Home" component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="lightbulb-o"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
          name="Tips" component={ExapmleScreen} />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="map"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
          name="Map" component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="comment"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
          name="Chat" component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name="user"
                size={size ? size : 24}
                color={focused ? color : "#222222"}
                focused={focused}
              />
            )
          }}
          name="Profile" component={HomeScreen} />





      </Tab.Navigator>
      {/* <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Exapmle" component={ExapmleScreen} options={{ headerShown: false }} />
        here you  put your screens like the previous one 
      </Stack.Navigator> */}

    </NavigationContainer>
  );
}


