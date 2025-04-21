import React, { useCallback, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

interface PasswordInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const validatePassword = (text: string) => {
    onChangeText(text);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="white"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={validatePassword}
      />

      <TouchableOpacity
        onPress={togglePasswordVisibility}
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
    paddingBottom: 2,
    marginBottom: height * 0.01,
  },
  input: {
    flex: 1,
    fontSize: height * 0.018,
    color: "white",
    paddingHorizontal: height * 0.01,
  },
  eyeButton: {
    padding: 5,
  },
  error: {
    color: "red",
    fontSize: height * 0.012,
  },
});

export default PasswordInput;
