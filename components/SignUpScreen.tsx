import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { AsyncStorage } from "react-native";

// tools
import { signUpMailPassword } from "./../tools/firebaseAuthTools";
import { IFetchResponse } from "./../tools/firebaseAuthTools";

export function SignUpScreen({ navigation, setLogged }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  async function signUp() {
    try {
      const response: IFetchResponse = await signUpMailPassword({
        email: userMail,
        password: userPassword,
      });
      console.log(response);

      if (response.status === "ok") {
        await AsyncStorage.setItem("logged", "true");
        await AsyncStorage.setItem("localId", response.data.localId);
        setLogged(true);
      } else {
        console.log("Oups...");
        Alert.alert("Oups...");
      }
    } catch (e) {
      console.log("Oups...");
      Alert.alert("Oups...");
      console.log(e);
    }
  }

  return (
    <View style={styles.containerCenter}>
      <View style={styles.containerForm}>
        <TextInput
          onChangeText={inputValue => setUserMail(inputValue)}
          style={styles.input}
          placeholder="jon.doe@gmail.com"
        />
        <TextInput
          onChangeText={inputValue => setUserPassword(inputValue)}
          style={styles.input}
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
