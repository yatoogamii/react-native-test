import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { AsyncStorage } from "react-native";

// tools
import { signInMailPassword } from "./../tools/firebaseAuthTools";

export function LoginScreen({ setLogged, navigation }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function login() {
    const response = await signInMailPassword({
      email: userMail,
      password: userPassword,
    });

    if (response.status === "ok") {
      try {
        await AsyncStorage.setItem("logged", "true");
        await AsyncStorage.setItem("localId", response.data.localId);
        setLogged(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Oups...");
      Alert.alert("Oups...");
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
        <TextInput
          style={styles.input}
          onChangeText={inputValue => setUserPassword(inputValue)}
          autoCapitalize="none"
          textContentType="password"
          placeholder="password"
        />
        <Button title="Se connecter" onPress={login} />
        <Text style={styles.text} onPress={() => navigation.navigate("SignIn")}>
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
  containerForm: {
    marginHorizontal: 40,
  },
  text: {
    marginTop: 10,
    opacity: 0.7,
    textDecorationLine: "underline",
  },
});
