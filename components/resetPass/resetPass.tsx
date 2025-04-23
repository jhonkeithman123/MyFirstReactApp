import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomButton from "../background/inputs/Button";
import EmailInput from "../background/inputs/emailInput";
import { AuthScreenType } from "../AuthScreen";

const { height } = Dimensions.get("window");

interface ResetScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
}

const ResetScreen: React.FC<ResetScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Labels}>Reset Password</Text>

      <View style={styles.inputContainer}>
        {/* <EmailInput /> */}
        <CustomButton
          title="Sign Up"
          onPress={() => console.log("Sign Up Button Pressed!")}
        />

        <TouchableOpacity
          onPress={() => handleToggle("login")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.loginText}>Go Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  Labels: {
    position: "absolute",
    fontSize: height * 0.031,
    color: "white",
    top: height * 0.14,
  },
  inputContainer: {
    position: "absolute",
    top: height * 0.294,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: height * 0.023,
    paddingVertical: height * 0.032,
    paddingBottom: height * 0.042,
  },
  loginText: {
    marginTop: height * 0.015,
    color: "white",
    fontSize: height * 0.016,
    textDecorationLine: "underline",
  },
});

export default ResetScreen;
