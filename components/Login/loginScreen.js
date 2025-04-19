import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import PasswordInput from "./passwordInput";
import CustomButton from "./Button";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>AICS</Text>
      <Text style={styles.Labels}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="white"
        />
        <PasswordInput />
        <CustomButton
          title="Login"
          onPress={() => console.log("Login button pressed!")}
        />

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socielButton}
            onPress={() => console.log("Google Sign-In")}
          >
            <Ionicons name="logo-google" size={24} color="white" />
            <Text style={styles.socialText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socielButton}
            onPress={() => console.log("Facebook Sign-In")}
          >
            <Ionicons name="logo-facebook" size={24} color="white" />
            <Text style={styles.socialText}>Sign in with Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => console.log("Sign-Up button pressed!")}
        >
          <Text style={styles.signUpText}>Don't have any account? Sign-Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Forgot Password button pressed!")}
        >
          <Text style={styles.signUpText}>
            Forgot your password? Reset Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Delete account button pressed!")}
        >
          <Text style={styles.signUpText}>
            Tired of this app? Delete Account
          </Text>
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
  logo: {
    width: 65,
    height: 65,
    borderRadius: 100,
    position: "absolute",
    top: 30,
    right: 165,
    objectFit: "contain",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  title: {
    position: "absolute",
    fontSize: 20,
    color: "white",
    top: 48,
    right: 110,
  },
  Labels: {
    position: "absolute",
    fontSize: 30,
    color: "white",
    top: 180,
  },
  inputContainer: {
    position: "absolute",
    top: 270,
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 20,
    paddingVertical: 30,
    paddingBottom: 40,
  },
  input: {
    width: "90%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    fontSize: 18,
    color: "white",
    marginBottom: 15,
  },
  socialContainer: {
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  socielButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    marginBottom: 10,
  },
  socialText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  signUpText: {
    marginTop: 15,
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
