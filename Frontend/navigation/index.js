// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { LogsScreen} from "./BottomTabNavigator"
import LinkingConfiguration from "./LinkingConfiguration";
import DisplayLogs from "../components/DisplayLogs";

export default function Navigation({ colorScheme, userData, setLoggedIn }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme ===  "dark" ? DefaultTheme : DefaultTheme}
    >
      <RootNavigator userData={userData} setLoggedIn={setLoggedIn}/>
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator({userData, setLoggedIn}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} initialParams={{userData, setLoggedIn}} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen 
      name="DisplayLogs" component={DisplayLogs} options={{headerShown: true,  headerTintColor: "white", headerTruncatedBackTitle: true,  headerTitle: "Bitácoras", headerStyle:{backgroundColor: "#FF8000"}, headerBackTitle: "Volver" }} />
    </Stack.Navigator>
  );
}
