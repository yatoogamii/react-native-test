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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAADtACo0kqZSuqXM-MeUL10KEev5KWIu0",
  authDomain: "appsocial-23e47.firebaseapp.com",
  databaseURL: "https://appsocial-23e47.firebaseio.com",
  projectId: "appsocial-23e47",
  storageBucket: "appsocial-23e47.appspot.com",
  messagingSenderId: "191864958746",
  appId: "1:191864958746:web:d06eb52de98eb7e81c86a3",
  measurementId: "G-G79G8T08VS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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
