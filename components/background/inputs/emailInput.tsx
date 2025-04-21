import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface EmailInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText }) => {
  const [error, setError] = useState("");

  const validateEmail = (text: string) => {
    onChangeText(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex) {
      setError("Invalid email format!");
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
        value={value}
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
