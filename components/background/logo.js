import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");

const LogoComponent = () => {
  const [title, setTitle] = useState("AICS");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLongPress = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTitle("Artificial Intelligence Comparator System");

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTitle("AICS");
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      }, 10000);
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.press}
        onLongPress={handleLongPress}
        delayLongPress={2000}
      >
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </Pressable>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        {title}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.15,
    height: height * 0.077,
    borderRadius: 60,
    position: "absolute",
    top: height * 0.0031,
    left: width * -0.027,
    objectFit: "fill",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  press: {
    left: width * -0.41,
    width: width * 0.1,
    top: height * -0.463,
    height: height * 0.08,
    padding: 10,
    zIndex: 1000,
    // backgroundColor: "rgba(255, 0, 0, 0.3)", //to know where it is
  },
  title: {
    position: "absolute",
    fontSize: height * 0.019,
    textAlign: "flex-start",
    alignSelf: "center",
    color: "white",
    top: height * 0.05,
    width: "80%",
    right: "-43%",
    //backgroundColor: "rgba(255, 0, 0, 0.3)", // for debugging purposes
  },
});

export default LogoComponent;
