import React, { useState, useRef, useEffect, FC } from "react";
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
import EmailVerif from "../background/inputs/emailVerif";
import { registerUser } from "../../backend/signup";
import sendVerificationEmail from "../../backend/api/emailVerif";
import { AuthScreenType } from "../AuthScreen";

const { height, width } = Dimensions.get("window");

interface SignupScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
  onStoreCredentials: (username: string, password: string) => void;
}

type SignupStep = "email" | "signup" | "otp";

const SignupScreen: FC<SignupScreenProps> = ({
  handleToggle,
  isButtonDisabled,
  onStoreCredentials,
}) => {
  const [step, setStep] = useState<SignupStep>("email"); // 1 for email, 2 for password

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const slideAnim = useRef(new Animated.Value(-height * 0.1)).current;
  const duration = 700;
  const defaultMessagePos = -height * 0.3;
  const destinationMessage = height * 0.014;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: message || error ? destinationMessage : defaultMessagePos, // ⬅️ Slide down when message appears, up when cleared
      duration: duration,
      useNativeDriver: true,
    }).start();

    if (message || error) {
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: defaultMessagePos,
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

  const formAnim = useRef(new Animated.Value(0)).current;
  const offScreenPos = width; // Moves input screen down for OTP transition

  const animateToStep = (newStep: SignupStep) => {
    Animated.timing(formAnim, {
      toValue: -offScreenPos,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      setStep(newStep);

      formAnim.setValue(offScreenPos);

      Animated.timing(formAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSendEmail = async (): Promise<void> => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!(email.includes("@") && email.includes("."))) {
      setError("Invalid email format. Emails must have @ and .");
      return;
    }
    try {
      const responseData = await sendVerificationEmail(email, "verification");
      if (responseData) {
        if (responseData.success) {
          setMessage(
            "Email sent successfully! Please check your inbox or spam."
          );

          setTimeout(() => {
            animateToStep("otp");
          }, 1000);
        } else if (responseData.error) {
          setError(responseData.error);
        } else {
          setError("Failed to send verification email. Please try again.");
        }
      } else {
        setError("Failed to send verification email. No data returned.");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  const handleVerifyOTP = async (): Promise<void> => {
    if (!otp || otp.length < 6) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    setMessage("OTP verified successfully!");

    setTimeout(() => {
      animateToStep("signup");
    }, 1000);
  };

  const handleSignup = async (): Promise<void> => {
    try {
      if (!email || !password || !username || !confirmPassword) {
        setError("All fields required.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be 8 characters or above.");
        return;
      }

      const allowedSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        password
      );
      if (!allowedSpecialChars) {
        setError("Password must contain at least one special character.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords must be match.");
        return;
      }

      if (!(email.includes("@") && email.includes("."))) {
        setError("Emails must have @ and . in them");
        return;
      }

      // Enforce minimum username length based on provider
      const emailDomain = email.split("@")[1];
      const emailParts = email.split("@");
      const usernameLength = email.split("@")[0].length;

      if (
        emailParts.length < 2 ||
        emailParts[1].length < 3 ||
        !emailParts[1].includes(".")
      ) {
        setError("Invalid Email.");
        return;
      }

      if (emailDomain.includes("gmail.com") && usernameLength < 6) {
        setError("Gmail emails must be at least 6 characters.");
        return;
      }
      if (emailDomain.includes("yahoo.com") && usernameLength < 4) {
        setError("Yahoo emails must be at least 4 characters.");
        return;
      }
      if (emailDomain.includes("icloud.com") && usernameLength > 21) {
        setError("iCloud emails must be 21 characters or fewer.");
        return;
      }

      if (username.length < 6) {
        setError("Username must be 6 characters or above.");
        return;
      }

      await registerUser(email, password, username);
      console.log("Sign Up successfull");
      setError(""); //* An empty setError means the process is success.
      setMessage("Your account has been created successfully!");

      onStoreCredentials(username, password);

      setTimeout(() => {
        handleToggle("login");
      }, 2000); // Redirect to login after 2 seconds
    } catch (error: any) {
      setError((error as Error)?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Labels}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Animated.View
          style={{
            width: "100%",
            alignItems: "center",
            transform: [{ translateY: formAnim }],
          }}
        >
          {step === "email" && (
            <>
              <EmailInput value={email} onChangeText={setEmail} />
              <CustomButton
                title="Send Verification Code"
                onPress={handleSendEmail}
              />
            </>
          )}
          {step === "otp" && (
            <>
              <EmailVerif
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOTP}
              />
              <CustomButton title="Verify OTP" onPress={handleVerifyOTP} />
            </>
          )}
          {step === "signup" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                value={email}
                editable={false}
              />
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
            </>
          )}
        </Animated.View>

        <TouchableOpacity
          onPress={() => handleToggle("login")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.loginText}>Go Back to Login</Text>
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
    overflow: "hidden",
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

export default SignupScreen;
