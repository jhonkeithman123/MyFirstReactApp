import React, { FC, useState, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

interface EmailVerifProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const EmailVerif: FC<EmailVerifProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const [isOTPVisible, setOTPVisible] = useState(false);

  const toggleOTPVisibility = useCallback(() => {
    setOTPVisible((prev) => !prev);
  }, []);

  const validateOTP = (text: string) => {
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={validateOTP}
        secureTextEntry={!isOTPVisible}
        placeholderTextColor="white"
      />
      <TouchableOpacity onPress={toggleOTPVisibility} style={styles.eyeButton}>
        <Ionicons
          name={isOTPVisible ? "eye-off" : "eye"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default EmailVerif;
