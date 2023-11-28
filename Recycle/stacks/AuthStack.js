import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import ConfirmCode from "../screens/ConfirmCode";
import FormAfterAuth from "../screens/FormAfterAuth";
import ChooseScreen from "../screens/ChooseScreen";
import CollectorScreen from "../screens/CollectorScreen";
import AccumulatorScreen from "../screens/AccumulatorScreen";
import ProfileCollector from "../screens/ProfileCollector";
import AccOnboarding from "../components/AccOnboarding";
import CollOmbording from "../components/CollOmbording";



const Stack = createNativeStackNavigator();

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