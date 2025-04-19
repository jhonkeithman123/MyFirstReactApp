import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={!isPasswordVisible}
      />

      <TouchableOpacity
        onPress={() => setPasswordVisible(!isPasswordVisible)}
        style={styles.eyeButton}
      >
        <Ionicons
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10,
  },
  eyeButton: {
    padding: 5,
  },
});

export default PasswordInput;
