// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import IncidentScreen from "../screens/IncidentScreen";
import LogsScreen from "../screens/LogsScreen";
import UserScreen from "../screens/UserScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          cardSyle: {},
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Incident"
        component={IncidentNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="alert-octagon-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Logs"
        component={LogsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="format-list-bulleted-type" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="account-circle-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Home Title",
          headerStyle: {
            backgroundColor: "#FF8000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
    </HomeStack.Navigator>
  );
}


const IncidentStack = createStackNavigator();

function IncidentNavigator() {
  return (
    <IncidentStack.Navigator>
      <IncidentStack.Screen
        name="IncidentScreen"
        component={IncidentScreen}
        options={{
          headerTitle: "Incidentes",
          headerStyle: {
            backgroundColor: "#FF8000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
    </IncidentStack.Navigator>
  );
}

const LogsStack = createStackNavigator();

function LogsNavigator() {
  return (
    <LogsStack.Navigator>
      <LogsStack.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{
          headerTitle: "Bitácoras",
          headerStyle: {
            backgroundColor: "#FF8000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
    </LogsStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerTitle: "Usuario",
          headerStyle: {
            backgroundColor: "#FF8000",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      />
    </UserStack.Navigator>
  );
}
