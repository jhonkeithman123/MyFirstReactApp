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
import { AuthScreenType } from "../AuthScreen";

const { height } = Dimensions.get("window");

interface AdminLoginScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
}

const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => handleToggle("login")}
        delayLongPress={2000}
        style={styles.press}
      >
        <Text style={styles.Labels}>Welcome to Admin Login</Text>
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          placeholderTextColor="white"
        />
        {/* <PasswordInput placeholder="Password" /> */}
        <CustomButton
          title="Login"
          onPress={() => console.log("Login button pressed!")}
        />

        <TouchableOpacity
          onPress={() => handleToggle("AdminSignup")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.signUpText}>
            Want to become Admin? Click here
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
  Labels: {
    position: "absolute",
    fontSize: height * 0.03,
    color: "white",
    top: height * -0.015,
    textAlign: "center",
  },
  press: {
    position: "absolute",
    top: height * 0.18,
    alignItems: "center",
    width: "100%",
  },
  inputContainer: {
    position: "absolute",
    top: height * 0.26,
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
  signUpText: {
    marginTop: height * 0.015,
    color: "white",
    fontSize: height * 0.016,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default AdminLoginScreen;
