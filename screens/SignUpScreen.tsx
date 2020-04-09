import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import * as firebase from "firebase";
import { AppStateContext } from "../App";

export function SignUpScreen({ navigation }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const appState = useContext(AppStateContext);

  async function signUp() {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(userMail, userPassword);
      appState.setUserProfile({
        isNewUser: response.additionalUserInfo.isNewUser,
      });
      appState.setLogged(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerForm}>
        <TextInput
          onChangeText={inputValue => setUserMail(inputValue)}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="jon.doe@gmail.com"
        />
        <TextInput
          onChangeText={inputValue => setUserPassword(inputValue)}
          style={styles.input}
          autoCapitalize="none"
          textContentType="password"
          placeholder="password"
        />
        <Button title="Créer un compte" onPress={signUp} />
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
  containerForm: {
    marginHorizontal: 40,
  },
  text: {
    marginTop: 10,
    opacity: 0.7,
    textDecorationLine: "underline",
  },
});
