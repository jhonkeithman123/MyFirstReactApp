import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import CustomButton from "../background/inputs/Button";
import PasswordInput from "../background/inputs/passwordInput";
import EmailInput from "../background/inputs/emailInput";
import { registerUser } from "../../backend/signup";

const { height, width } = Dimensions.get("window");

interface SignupScreenProps {
  handleToggle: (screen: string) => void;
  isButtonDisabled?: boolean;
}

const SignupScreen: React.FC<SignupScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const slideAnim = useRef(new Animated.Value(-30)).current;

  useEffect(() => {
    if (message || error) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -30,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 350);
      });
    } else {
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 350);
      });
    }
  }, [message, error]);

  const handleSignup = async () => {
    try {
      if (!email || !password || !username || !confirmPassword) {
        setError("All fields required.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords must be match.");
        return;
      }

      await registerUser(email, password, username);
      console.log("Sign Up successfull");
      setError(""); //* An empty setError means the process is success.
      setMessage("Your account has been created successfully!");
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Labels}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <EmailInput value={email} onChangeText={setEmail} />
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="white"
          value={username}
          onChangeText={setUsername}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <CustomButton title="Sign Up" onPress={handleSignup} />

        <TouchableOpacity
          onPress={() => handleToggle("login")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.loginText}>Go Back to Login</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={styles.messageContainer}>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </Animated.View>
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
    top: height * 0.13,
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
  error: {
    color: "red",
    fontSize: height * 0.012,
  },
  message: {
    color: "green",
    fontSize: height * 0.012,
  },
  messageContainer: {
    position: "absolute",
    top: height * 0.02,
    padding: height * 0.01,
    width: "90%",
    backgroundColor: "#4630EB",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: width * 0, height: height * 0.002 },
  },
});

export default SignupScreen;
