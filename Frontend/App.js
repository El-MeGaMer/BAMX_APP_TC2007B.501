import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";

import Login from "./screens/Login";
import { useState } from "react";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  const [LoggedIn, setLoggedIn] = useState(false)
  const [Role, setRole] = useState("")
  const [Id, setId] = useState(0)

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {LoggedIn && Id != 0 && <Navigation colorScheme={colorScheme} />}
        {!LoggedIn && <Login setLoggedIn={setLoggedIn} setRole={setRole} setId={setId} />}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
