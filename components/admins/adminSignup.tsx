import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import CustomButton from "../background/inputs/Button";
import PasswordInput from "../background/inputs/passwordInput";
import EmailInput from "../background/inputs/emailInput";
import { AuthScreenType } from "../AuthScreen";

const { height } = Dimensions.get("window");

interface AdminSignupScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
}

const AdminSignUpScreen: React.FC<AdminSignupScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => handleToggle("AdminLogin")}
        delayLongPress={2000}
        style={styles.press}
      >
        <Text style={styles.Labels}>Welcome, Please Sign Up</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        {/* <EmailInput /> */}
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="white"
        />
        {/* <PasswordInput placeholder="Password" /> */}
        {/* <PasswordInput placeholder="Confirm Password" /> */}
        <TextInput
          style={styles.input}
          placeholder="Why do you want to be an admin?"
          placeholderTextColor="white"
        />
        <CustomButton
          title="Sign Up"
          onPress={() => console.log("Sign Up Button Pressed!")}
        />

        <TouchableOpacity
          onPress={() => handleToggle("AdminLogin")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.loginText}>Back to Admin Login</Text>
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
    fontSize: height * 0.03,
    color: "white",
    top: height * -0.015,
    textAlign: "center",
  },
  press: {
    position: "absolute",
    top: height * 0.145,
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    position: "absolute",
    top: height * 0.23,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: height * 0.027,
    paddingVertical: height * 0.03,
    paddingBottom: height * 0.05,
  },
  input: {
    width: "90%",
    padding: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: height * 0.0178,
    color: "white",
    marginBottom: height * 0.013,
  },
  loginText: {
    marginTop: height * 0.016,
    color: "white",
    fontSize: height * 0.016,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default AdminSignUpScreen;
