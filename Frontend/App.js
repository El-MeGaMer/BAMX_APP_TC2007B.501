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
      console.log("use")
      try {
        if ( loggedIn === true ) {
          console.log("verificado")
          setVerified(true);
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error.message);
      } finally {
        setLoading(false); 
      }

    }

    checkLoggedIn();
  }, [loggedIn, setVerified]);

  const user = {
    rol: role,
    id: id
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {verified ? (
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
