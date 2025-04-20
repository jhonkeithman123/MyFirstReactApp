import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import EmailInput from "../background/inputs/emailInput";
import CustomButton from "../background/inputs/Button";

const { width, height } = Dimensions.get("window");

const DeleteScreen = ({ handleToggle, isButtonDisabled }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Labels}>Delete Account</Text>

      <View style={styles.inputContainer}>
        <EmailInput />
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
    fontSize: height * 0.032,
    color: "white",
    top: height * 0.11,
  },
  inputContainer: {
    position: "absolute",
    top: height * 0.274,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: height * 0.022,
    paddingVertical: height * 0.0311,
    paddingBottom: height * 0.04,
  },
  loginText: {
    marginTop: height * 0.015,
    color: "white",
    fontSize: height * 0.016,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default DeleteScreen;
