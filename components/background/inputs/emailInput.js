import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (text) => {
    setEmail(text);
    if (!text.includes("@")) {
      setError("Invalid email. Must contain '@'");
    } else {
      setError("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={validateEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "90%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    marginLeft: 18,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default EmailInput;
