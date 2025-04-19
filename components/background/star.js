import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

const Star = ({ style }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.star, style, { opacity }]} />;
};

const styles = StyleSheet.create({
  star: {
    width: 2,
    height: 2,
    backgroundColor: "white",
    position: "absolute",
  },
});

export default Star;
