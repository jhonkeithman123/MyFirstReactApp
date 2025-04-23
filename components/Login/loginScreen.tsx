import React, { useState, useRef, useEffect, FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Animated,
} from "react-native";
import PasswordInput from "../background/inputs/passwordInput";
import CustomButton from "../background/inputs/Button";
import { Ionicons } from "@expo/vector-icons";
import { loginUser } from "../../backend/login";
import { AuthScreenType } from "../AuthScreen";

const { width, height } = Dimensions.get("window");

interface LoginScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
  defaultPassword?: string;
  defaultUsername?: string;
}

const LoginScreen: FC<LoginScreenProps> = ({
  handleToggle,
  isButtonDisabled,
  defaultPassword = "",
  defaultUsername = "",
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loginAttemps, setLoginAttemps] = useState(0); //Password attempts
  const [loginAtteptsEmail, setLoginAttempsEmail] = useState(0); //Email attempts

  const slideAnim = useRef(new Animated.Value(-height * 0.1)).current;
  const duration = 700;
  const defaultPos = -height * 0.3;
  const destination = height * 0.014;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: message || error ? destination : defaultPos, // ⬅️ Slide down when message appears, up when cleared
      duration: duration,
      useNativeDriver: true,
    }).start();

    if (message || error) {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: defaultPos,
          duration: duration,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setMessage("");
            setError("");
          }, 900);
        });
      }, 5000);
    }
  }, [message, error]);

  const handleLogin = async (): Promise<void> => {
    try {
      if (!emailOrUsername || !password) {
        setError("Please fill in all fields.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      const allowedSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        password
      );
      if (!allowedSpecialChars) {
        setError("Password must contain at least one special character.");
        return;
      }

      await loginUser(emailOrUsername, password);
      setMessage("Login successful!");
      setLoginAttemps(0);

      setTimeout(() => {
        handleToggle("profile");
      }, 2000);
    } catch (error: any) {
      console.error("Login error:", (error as Error)?.message);
      let errorMessage = "Login failed. Please try again.";

      if (error?.code === "auth/wrong-password") {
        setLoginAttemps((prevAttemps) => prevAttemps + 1);
        errorMessage = "Incorrect password.";
      } else if (error?.code === "auth/user-not-found") {
        setLoginAttempsEmail((prevAttemps) => prevAttemps + 1);
        errorMessage = "Account with this email doesn't exist.";
      }
    }
  };

  useEffect(() => {
    if (loginAttemps >= 6) {
      setError("Too many failed login attempts. Please reset your password.");
      setTimeout(() => {
        handleToggle("reset");
      }, 2000);
    } else if (loginAtteptsEmail >= 6) {
      setError("Too many failed Login attempts. Please sign up.");
      setTimeout(() => {
        handleToggle("signup");
      }, 2000);
    }
  }, [loginAttemps, handleToggle]);

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
          value={emailOrUsername}
          onChangeText={setEmailOrUsername}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton title="Login" onPress={handleLogin} />

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
      <Animated.View
        style={[
          styles.messageContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
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
  error: {
    color: "red",
    fontSize: height * 0.013,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: width * 0, height: height * 0.002 },
    backgroundColor: "#1f2d42",
    padding: height * 0.013,
  },
  message: {
    color: "green",
    fontSize: height * 0.013,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: width * 0, height: height * 0.002 },
    backgroundColor: "#1f2d42",
    padding: height * 0.013,
  },
  messageContainer: {
    position: "absolute",
    top: height * 0.02,
    padding: height * 0.01,
    width: "90%",
    alignItems: "center",
    // backgroundColor: "#4630EB",
  },
});

export default LoginScreen;
