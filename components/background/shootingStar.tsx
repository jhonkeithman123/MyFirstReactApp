import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Star from "./star";

const { height, width } = Dimensions.get("window");

const StarryBackground = () => {
  const stars = Array.from({ length: 40 }).map((_) => ({
    top: Math.random() * height,
    left: Math.random() * width,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.background}
        colors={["#000428", "#004e92"]}
      />
      {stars.map((star, index) => (
        <Star key={index} style={{ top: star.top, left: star.left }} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default StarryBackground;
