import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { AsyncStorage } from "react-native";

export function LoginScreen({ setLogged, navigation }) {
  async function login() {
    try {
      await AsyncStorage.setItem("logged", "true");
      setLogged(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerForm}>
        <TextInput style={styles.input} placeholder="jon.doe@gmail.com" />
        <TextInput style={styles.input} placeholder="password" />
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
    alignItems: "stretch"
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#1d1d1d",
    padding: 10,
    marginBottom: 10
  },
  containerForm: {
    marginHorizontal: 40
  },
  text: {
    marginTop: 10,
    opacity: 0.7,
    textDecorationLine: "underline"
  }
});
