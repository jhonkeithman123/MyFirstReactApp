import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import LoginScreen from "./Login/loginScreen";
import SignupScreen from "./signup/SignupScreen";
import DeleteScreen from "./delete/DeleteScreen";
import ResetScreen from "./resetPass/resetPass";
import AdminLoginScreen from "./admins/adminLogin";
import AdminSignUpScreen from "./admins/adminSignup";
import LogoComponent from "./background/logo";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = (screen) => {
    if (screen === currentScreen) return;

    setButtonDisabled(true);

    let slidingDirection = screen === "login" ? 50 : -50;

    Animated.timing(slideAnim, {
      toValue: slidingDirection,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      requestAnimationFrame(() => setCurrentScreen(screen));

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setButtonDisabled(false));
    });
  };

  return (
    <View style={styles.container}>
      <LogoComponent />
      <Animated.View
        style={[styles.screen, { transform: [{ translateY: slideAnim }] }]}
      >
        {currentScreen === "login" && (
          <LoginScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
        {currentScreen === "signup" && (
          <SignupScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
        {currentScreen === "reset" && (
          <ResetScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
        {currentScreen === "delete" && (
          <DeleteScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
        {currentScreen === "AdminLogin" && (
          <AdminLoginScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
        {currentScreen === "AdminSignup" && (
          <AdminSignUpScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: "10%",
    transform: [{ translateY: height * 0.25 }],
  },
  toggleButton: {
    position: "absolute",
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    bottom: 50,
    backgroundColor: "#A7C7E7",
  },
  toggleText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AuthScreen;
