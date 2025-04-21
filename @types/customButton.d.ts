declare module "../background/inputs/passwordInput" {
  import * as React from "react";
  import { TouchableOpacityProps } from "react-native";

  export interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
  }

  const CustomButton: React.FC<CustomButtonProps>;

  export default CustomButton;
}
