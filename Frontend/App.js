import "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import { useColorScheme } from "react-native";
import { useState, useEffect } from "react";

import Navigation from "./navigation";

import Login from "./screens/Login";

export default function App() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true); 
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  useEffect(() => {
    async function checkLoggedIn() {
      let result = await SecureStore.getItemAsync("token");

      if (result) {
        setId(result.id)
        setRole(result.rol)
        setLoggedIn(true)
      }
    }

    checkLoggedIn();
  }, [loggedIn]);

  const user = {
    rol: role,
    id: id
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {loggedIn ? (
          <Navigation colorScheme={colorScheme} userData={user} />
        ) : (
          <Login 
            setLoggedIn={setLoggedIn}
            setRole={setRole}
            setId={setId} 
          />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
