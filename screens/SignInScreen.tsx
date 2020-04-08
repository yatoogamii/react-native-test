import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

export function SignInScreen({ setLogged, navigation }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setErrorMessage] = useState({ code: "", message: "" });

  async function signInByEmail() {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(userMail, userPassword);
      setLogged(true);
    } catch (e) {
      console.log(e);
      setErrorMessage({ code: e.code, message: e.message });
    }
  }

  async function signInByFacebook() {
    try {
      console.log("test 1");
      await Facebook.initializeAsync("208182217139760", "AppSocial");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: [
          "public_profile",
          "email",
          "user_gender",
          "user_location",
        ],
      });

      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const response = await firebase.auth().signInWithCredential(credential);
        console.log(response);
      }
      console.log("test 2");
    } catch (e) {
      console.log(e);
      setErrorMessage({ code: e.code, message: e.message });
    }
  }

  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerForm}>
        <TextInput
          style={styles.input}
          onChangeText={inputValue => setUserMail(inputValue)}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="jon.doe@gmail.com"
        />
        {error.code === "auth/invalid-email" && (
          <Text style={{ color: "red" }}>{error.message}</Text>
        )}
        <TextInput
          style={styles.input}
          onChangeText={inputValue => setUserPassword(inputValue)}
          autoCapitalize="none"
          textContentType="password"
          placeholder="password"
        />
        {error.code === "auth/wrong-password" && (
          <Text style={{ color: "red" }}>{error.message}</Text>
        )}
        <View>
          <Button title="Se connecter" onPress={signInByEmail} />
        </View>
        <View style={styles.button}>
          <Button
            title="Se connecter par Facebook"
            color="blue"
            onPress={signInByFacebook}
          />
        </View>
        <Text style={styles.text} onPress={() => navigation.navigate("SignUp")}>
          Vous voulez créer un compte ?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#1d1d1d",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    paddingTop: 5,
  },
  containerForm: {
    marginHorizontal: 40,
  },
  text: {
    marginTop: 10,
    opacity: 0.7,
    textDecorationLine: "underline",
  },
  textLoading: {
    textAlign: "center",
    marginBottom: 40,
  },
});