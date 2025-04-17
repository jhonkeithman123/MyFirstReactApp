import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        style={styles.fadingLine}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    backgroundColor: "#6200EE",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 15,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  fadingLine: {
    width: "80%",
    height: 2,
    marginTop: 4,
    color: "black",
  },
});

export default Header;
