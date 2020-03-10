import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AsyncStorage } from "react-native";

export function HomeScreen({ setLogged }) {
  async function logout() {
    try {
      await AsyncStorage.clear();
      setLogged(false);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Bienvenue dans le Home</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginHorizontal: 20
  },
  title: {
    marginBottom: 20,
    textAlign: "center"
  }
});