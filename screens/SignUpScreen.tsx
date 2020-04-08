import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import * as firebase from "firebase";

export function SignUpScreen({ navigation, setLogged }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function signUp() {
    console.log("test 1");
    firebase.auth().createUserWithEmailAndPassword(userMail, userPassword);
    setLogged(true);
    console.log("test 2");
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
