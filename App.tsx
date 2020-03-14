import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AsyncStorage } from "react-native";

// components
import { SignInScreen } from "./components/SignInScreen";
import { SignUpScreen } from "./components/SignUpScreen";
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkUserAlreadyLogged();
    console.log(logged);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLoading}>
          Chargement de votre session en cours...
        </Text>
        <ActivityIndicator size="large" color="#1d1d1d" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {logged === false ? (
        <LoginStackScreen setLogged={setLogged} />
      ) : (
        <HomeStackScreen setLogged={setLogged} />
      )}
    </NavigationContainer>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen({ setLogged }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home">
        {props => <HomeScreen {...props} setLogged={setLogged} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

const LoginStack = createStackNavigator();

function LoginStackScreen({ setLogged }) {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="SignIn">
        {props => <SignInScreen {...props} setLogged={setLogged} />}
      </LoginStack.Screen>
      <LoginStack.Screen name="SignUp">
        {props => <SignUpScreen {...props} setLogged={setLogged} />}
      </LoginStack.Screen>
    </LoginStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textLoading: {
    textAlign: "center",
    marginBottom: 40,
  },
});
