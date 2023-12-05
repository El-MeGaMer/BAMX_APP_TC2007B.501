// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import IncidentScreen from "../screens/IncidentScreen";
import LogsScreen from "../screens/LogsScreen";
import UserScreen from "../screens/UserScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CreateLogScreen from "../screens/CreateLogScreen";
import ExportarBitacoras from "../screens/ExportarBitacora";
import PendingLogScreen from "../screens/PendingLogScreen";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const { userData, setLoggedIn } = route.params;
  const colorScheme = useColorScheme();

  console.log(userData)

  // TO CHANGE:
  // Set user role
  // this needs to be changed to a global variable that will be used in props
  // to determine the role of the user
  // example
  // let user = this.props.user
  // user.isAdmin
  let isAdmin: boolean = false;
  let isCoordinador: boolean = false;
  let isSupervisor: boolean = false;

  if(userData.rol === "administrador") {isAdmin = true;}
  else if(userData.rol === "coordinador") {isCoordinador = true;}
  else if(userData.rol === "supervisor") {isSupervisor = true;}

  // Function that returns the bottom tab navigator
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      {/* Renders the homescreen */}
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
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

      {/* Conditional rendering of Logs screens depending on the user role */}
      {isCoordinador && (
        <BottomTab.Screen
          name="Logs"
          component={CreateLogsNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="format-list-bulleted-type" color={color} />
            ),
          }}
        />
      )}
      {isAdmin && (
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
      )}
      {isSupervisor && (
        <BottomTab.Screen
          name="Logs"
          component={ExBitNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="format-list-bulleted-type" color={color} />
            ),
          }}
        />
      )}

      {/* Renders the user screen */}
      <BottomTab.Screen
        name="User"
        component={UserNavigator}
        initialParams={{ setLoggedIn }}
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

function HomeNavigator({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
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
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Home Title",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("NotificationHome");
              }}
            >
              <TabBarIcon name="bell-outline" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <HomeStack.Screen
        name="NotificationHome"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
            >
              <TabBarIcon name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

const IncidentStack = createStackNavigator();

function IncidentNavigator({ navigation }) {
  return (
    <IncidentStack.Navigator
      screenOptions={{
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
    >
      <IncidentStack.Screen
        name="IncidentScreen"
        component={IncidentScreen}
        options={{
          headerTitle: "Incidentes",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("NotificationIncident");
              }}
            >
              <TabBarIcon name="bell-outline" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <IncidentStack.Screen
        name="NotificationIncident"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate("IncidentScreen");
              }}
            >
              <TabBarIcon name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </IncidentStack.Navigator>
  );
}

const LogsStack = createStackNavigator();

function LogsNavigator({ navigation }) {
  return (
    <LogsStack.Navigator
      screenOptions={{
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
    >
      <LogsStack.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{
          headerTitle: "Bitácoras",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("NotificationLogs");
              }}
            >
              <TabBarIcon name="bell-outline" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <LogsStack.Screen
        name="NotificationLogs"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate("LogsScreen");
              }}
            >
              <TabBarIcon name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </LogsStack.Navigator>
  );
}

const CreateLogStack = createStackNavigator();

function CreateLogsNavigator({ navigation }) {
  return (
    <CreateLogStack.Navigator
      screenOptions={{
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
    >
      <CreateLogStack.Screen
        name="CreateLogScreen"
        component={CreateLogScreen}
        options={{
          headerTitle: "Crear Bitácora",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("NotificationCreateLogs");
              }}
            >
              <TabBarIcon name="bell-outline" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <CreateLogStack.Screen
        name="NotificationCreateLogs"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate("CreateLogScreen");
              }}
            >
              <TabBarIcon name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </CreateLogStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserNavigator({ navigation, route }) {
  return (
    <UserStack.Navigator
      screenOptions={{
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
    >
      <UserStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerTitle: "Usuario",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                navigation.navigate("NotificationUser");
              }}
            >
              <TabBarIcon name="bell-outline" color="white" />
            </TouchableOpacity>
          ),
        }}
        initialParams={{ setLoggedIn: route.params.setLoggedIn }}
      />
      <UserStack.Screen
        name="NotificationUser"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => {
                navigation.navigate("UserScreen");
              }}
            >
              <TabBarIcon name="arrow-left" color="white" />
            </TouchableOpacity>
          ),
        }}
      />
    </UserStack.Navigator>
  );
}

function ExBitNavigator() {
  return (
    <IncidentStack.Navigator>
      <IncidentStack.Screen
        name="ExportarBitacora"
        component={ExportarBitacoras}
        options={{
          headerTitle: "Exportar Datos",
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
