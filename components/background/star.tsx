import React, { useRef, useEffect } from "react";
import { Animated, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface StarProps {
  style?: StyleProp<ViewStyle>;
}

const Star: React.FC<StarProps> = ({ style }) => {
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
