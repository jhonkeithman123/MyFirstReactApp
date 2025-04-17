import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import Header from "./header.js";

export default function App() {
  console.log("Tester connected");

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My first App" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    justifyContent: "flex-start",
  },
});
