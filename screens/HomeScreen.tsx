import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as firebase from "firebase";
import { UserProfileContext } from "../App";

export function HomeScreen({ setLogged }) {
  const userProfile = useContext(UserProfileContext);

  async function logout() {
    try {
      setLogged(false);
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>
        Hello {userProfile.displayName || "anonyme"} ! Bienvenue dans le Home
      </Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginHorizontal: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
});
