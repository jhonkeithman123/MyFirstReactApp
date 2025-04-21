import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import AuthScreen from "./components/AuthScreen";
import StarryBackground from "./components/background/shootingStar";

export default function App() {
  console.log("Tester connected");

  return (
    <SafeAreaView style={styles.container}>
      <StarryBackground />
      <AuthScreen />
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
