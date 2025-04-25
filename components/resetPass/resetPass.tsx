import React, { FC, useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import CustomButton from "../background/inputs/Button";
import EmailInput from "../background/inputs/emailInput";
import EmailVerif from "../background/inputs/emailVerif";
import { AuthScreenType } from "../AuthScreen";

const { height, width } = Dimensions.get("window");

interface ResetScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled?: boolean;
}

const ResetScreen: FC<ResetScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const screenAnim = useRef(new Animated.Value(0)).current;
  const messageAnim = useRef(new Animated.Value(-height * 0.1)).current;
  const duration = 700;
  const defaultMessagePos = -height * 0.2;
  const destinationMessagePos = height * 0.015;
  const offScreenPos = height * 0.7; // Moves input screen down for OTP transition

  useEffect(() => {
    Animated.timing(messageAnim, {
      toValue: message || error ? destinationMessagePos : defaultMessagePos, // ⬅️ Slide down when message appears, up when cleared
      duration: duration,
      useNativeDriver: true,
    }).start();

    if (message || error) {
      setTimeout(() => {
        Animated.timing(messageAnim, {
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

  const handleEmailSubmit = async (): Promise<void> => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!(email.includes("@") && email.includes("."))) {
      setError("Emails must have @ and . in them");
      return;
    }

    setMessage("Verification code sent to your email.");

    Animated.timing(screenAnim, {
      toValue: offScreenPos,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setIsEmailSent(true);

        Animated.timing(screenAnim, {
          toValue: height * 0.015,
          duration: duration,
          useNativeDriver: true,
        }).start();
      }, 100);
    });
  };

  const handleOTPSubmit = async (): Promise<void> => {
    if (!otp || otp.length !== 6) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    setMessage("Password reset successful.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Labels}>Reset Password</Text>

      <Animated.View
        style={[
          styles.inputContainer,
          { transform: [{ translateY: screenAnim }] },
        ]}
      >
        {!isEmailSent ? (
          <>
            <EmailInput value={email} onChangeText={setEmail} />
            <CustomButton title="Submit" onPress={handleEmailSubmit} />
          </>
        ) : (
          <>
            <EmailVerif
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOTP}
            />
            <CustomButton title="Verify OTP" onPress={handleOTPSubmit} />
          </>
        )}

        <TouchableOpacity
          onPress={() => handleToggle("login")}
          disabled={isButtonDisabled}
          style={isButtonDisabled && { opacity: 0.5 }}
        >
          <Text style={styles.loginText}>Go Back to Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.messageContainer,
          { transform: [{ translateY: messageAnim }] },
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

export default ResetScreen;
