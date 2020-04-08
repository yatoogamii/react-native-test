// React import
import React, { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Firebase
import * as firebase from "firebase";

// Context
export const UserProfileContext = createContext({
  email: "",
  displayName: "",
  tokenId: "",
  phone: "",
  photoURL: "",
});

// Your web app's Firebase configuration
// @TODO mettre les infos dans un .env
const firebaseConfig = {
  apiKey: "AIzaSyAADtACo0kqZSuqXM-MeUL10KEev5KWIu0",
  authDomain: "appsocial-23e47.firebaseapp.com",
  databaseURL: "https://appsocial-23e47.firebaseio.com",
  projectId: "appsocial-23e47",
  storageBucket: "appsocial-23e47.appspot.com",
  messagingSenderId: "191864958746",
  appId: "1:191864958746:web:d06eb52de98eb7e81c86a3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// components
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [logged, setLogged] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  function checkUserAlreadyLogged() {
    firebase.auth().onAuthStateChanged(async user => {
      try {
        if (user !== null) {
          setUserProfile({
            email: user.email,
            displayName: user.displayName,
            phone: user.phoneNumber,
            photoURL: user.photoURL,
            tokenId: await user.getIdToken(),
          });
          setLogged(true);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    });

    setTimeout(() => {}, 1000);
  }

  useEffect(() => {
    checkUserAlreadyLogged();
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
    <UserProfileContext.Provider value={userProfile}>
      <NavigationContainer>
        {logged === false ? (
          <LoginStackScreen setLogged={setLogged} />
        ) : (
          <HomeStackScreen setLogged={setLogged} />
        )}
      </NavigationContainer>
    </UserProfileContext.Provider>
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
