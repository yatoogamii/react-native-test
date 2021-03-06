import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as firebase from "firebase";
import { AppStateContext } from "../App";

export function CompleteProfileScreen() {
  const appState = useContext(AppStateContext);

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.title}>Veuillez completer votre profile</Text>
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
