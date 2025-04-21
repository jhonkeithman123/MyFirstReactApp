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
import PasswordInput from "../background/inputs/passwordInput";
import CustomButton from "../background/inputs/Button";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface LoginScreenProps {
  handleToggle: (screen: string) => void;
  isButtonDisabled?: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
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
        <Text style={styles.Labels}>Login</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="white"
        />
        <PasswordInput placeholder="Password" />
        <CustomButton
          title="Login"
          onPress={() => console.log("Login button pressed!")}
        />

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socielButton}
            onPress={() => console.log("Google Sign-In")}
          >
            <Ionicons name="logo-google" size={height * 0.024} color="white" />
            <Text style={styles.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socielButton}
            onPress={() => console.log("Facebook Sign-In")}
          >
            <Ionicons
              name="logo-facebook"
              size={height * 0.024}
              color="white"
            />
            <Text style={styles.socialText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleToggle("signup")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.signUpText}>No Account? Sign-Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleToggle("reset")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.signUpText}>Forgot Password? Reset it</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleToggle("delete")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.signUpText}>Tired of this app? Delete it</Text>
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
    top: height * 0.125,
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    position: "absolute",
    top: height * 0.197,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: height * 0.023,
    paddingVertical: height * 0.03,
    paddingBottom: height * 0.04,
  },
  input: {
    width: "90%",
    padding: height * 0.012,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: height * 0.019,
    color: "white",
    marginBottom: 15,
  },
  socialContainer: {
    width: "100%",
    marginTop: height * 0.015,
    alignItems: "center",
  },
  socielButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: height * 0.012,
    borderRadius: 10,
    width: "80%",
    marginBottom: height * 0.01,
  },
  socialText: {
    color: "white",
    fontSize: height * 0.016,
    marginLeft: width * 0.018,
  },
  signUpText: {
    marginTop: height * 0.015,
    color: "white",
    fontSize: height * 0.016,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default LoginScreen;
