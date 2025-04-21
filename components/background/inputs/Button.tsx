import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#A7C7E7",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomButton;
