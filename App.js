import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginScreen from "./components/Login/loginScreen.js";
import StarryBackground from "./components/background/shootingStar.js";

export default function App() {
  console.log("Tester connected");

  return (
    <SafeAreaView style={styles.container}>
      <StarryBackground />
      <LoginScreen />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    justifyContent: "flex-start",
  },
});
