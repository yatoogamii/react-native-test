import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AsyncStorage } from "react-native";

const Stack = createStackNavigator();

import { LoginScreen } from "./components/LoginScreen";
import { SignInScreen } from "./components/SignInScreen";
import { HomeScreen } from "./components/HomeScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [logged, setLogged] = useState(false);

  async function checkUserAlreadyLogged() {
    try {
      const userAlreadyLogged = await AsyncStorage.getItem("logged");
      if (!!userAlreadyLogged) {
        setLogged(true);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkUserAlreadyLogged();
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ecran de chargement</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1d1d1d"
          },
          headerTintColor: "#fff",
          headerTitleStyle: {},
          headerTitleAlign: "center"
        }}>
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setLogged={setLogged} />}
        </Stack.Screen>
        {logged && <Stack.Screen name="Home" component={HomeScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* <Stack.Screen name="SignIn" component={SignInScreen} /> */
