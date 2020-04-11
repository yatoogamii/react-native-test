// env
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "react-native-dotenv";
// React import
import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Firebase
import * as firebase from "firebase";
import "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// components
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { CompleteProfileScreen } from "./screens/CompleteProfileScreen";

const appState = {
  userProfile: {
    email: "",
    displayName: "",
    phone: "",
    photoURL: "",
    tokenId: "",
    isNewUser: false,
  },
  setUserProfile: action => {},
  setLogged: action => {},
};

// context
export const AppStateContext = createContext(null);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [logged, setLogged] = useReducer(setLoggedReducer, false);
  const [userProfile, setUserProfile] = useReducer(
    userProfileReducer,
    appState,
  );

  function userProfileReducer(state, action) {
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        ...action,
      },
    };
  }

  function setLoggedReducer(state, action) {
    return action;
  }

  function checkUserAlreadyLogged() {
    firebase.auth().onAuthStateChanged(async user => {
      try {
        const users = await db.collection("users").get();
        users.forEach(docs => {
          console.log(docs.data());
        });

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
    <AppStateContext.Provider
      value={{
        ...userProfile,
        setUserProfile,
        setLogged: setLogged,
      }}>
      <NavigationContainer>
        {logged === false ? <LoginStackScreen /> : <HomeStackScreen />}
      </NavigationContainer>
    </AppStateContext.Provider>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  const appState = useContext(AppStateContext);
  return (
    <HomeStack.Navigator>
      {appState.userProfile.isNewUser === true ? (
        <HomeStack.Screen name="CompleteProfile">
          {props => <CompleteProfileScreen />}
        </HomeStack.Screen>
      ) : (
        <HomeStack.Screen name="Home">
          {props => <HomeScreen {...props} />}
        </HomeStack.Screen>
      )}
    </HomeStack.Navigator>
  );
}

const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="SignIn">
        {props => <SignInScreen {...props} />}
      </LoginStack.Screen>
      <LoginStack.Screen name="SignUp">
        {props => <SignUpScreen {...props} />}
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
