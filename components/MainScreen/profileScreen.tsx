import React, { FC } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthScreenType } from "../AuthScreen";

interface ProfileScreenProps {
  handleToggle: (screen: AuthScreenType) => void;
  isButtonDisabled: boolean;
}

const ProfileScreen: FC<ProfileScreenProps> = ({
  handleToggle,
  isButtonDisabled,
}) => {
  return (
    <View style={styles.constiner}>
      <Text>Profile</Text>
      <TouchableOpacity>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {},
});

export default ProfileScreen;
