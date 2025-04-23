import React, { useState, useRef, FC } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";
import LoginScreen from "./Login/loginScreen";
import SignupScreen from "./signup/SignupScreen";
import DeleteScreen from "./delete/DeleteScreen";
import ResetScreen from "./resetPass/resetPass";
import AdminLoginScreen from "./admins/adminLogin";
import AdminSignUpScreen from "./admins/adminSignup";
import LogoComponent from "./background/logo";
import ProfileScreen from "./MainScreen/profileScreen";

const { height } = Dimensions.get("window");

export type AuthScreenType =
  | "signup"
  | "login"
  | "reset"
  | "delete"
  | "AdminLogin"
  | "AdminSignup"
  | "profile";

const AuthScreen: FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>("login");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [storedUsername, setStoredUsername] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = (screen: AuthScreenType) => {
    if (screen === currentScreen) return;

    setButtonDisabled(true);

    let slidingDirection = screen === "login" ? height * 0.9 : height * 0.9;
    const duration = 800;

    Animated.timing(slideAnim, {
      toValue: slidingDirection,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(screen);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start(() => setButtonDisabled(false));
    });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "signup":
        return (
          <SignupScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
            // When signup finishes, store the credentials
            onStoreCredentials={(username: string, password: string) => {
              setStoredUsername(username);
              setStoredPassword(password);
            }}
          />
        );
      case "login":
        return (
          <LoginScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
            defaultUsername={storedUsername}
            defaultPassword={storedPassword}
          />
        );
      case "reset":
        return (
          <ResetScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        );
      case "delete":
        return (
          <DeleteScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        );
      case "AdminLogin":
        return (
          <AdminLoginScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        );
      case "AdminSignup":
        return (
          <AdminSignUpScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            handleToggle={handleToggle}
            isButtonDisabled={isButtonDisabled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LogoComponent />
      <Animated.View
        style={[styles.screen, { transform: [{ translateY: slideAnim }] }]}
      >
        {renderScreen()}
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
