import "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import { useAuth } from "./hooks/useAuth";
import { useColorScheme } from "react-native";
import { useState } from "react";

import Navigation from "./navigation";

import Login from "./screens/Login";

export default function App() {
  const [verified, setVerified] = useState(false);
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  const [loggedIn, role, id] = useAuth(verified);

  const user = {
    rol: role,
    id: id
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
		  {loggedIn && id !== 0 && <Navigation colorScheme={colorScheme} userData={user}/>}
		  {!loggedIn && <Login setVerified={ setVerified }/> }
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
