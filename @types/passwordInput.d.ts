declare module "../background/inputs/passwordInput" {
  import * as React from "react";
  import { TextInputProps } from "react-native";

  export interface PasswordInputProps extends TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
  }

  const PasswordInput: React.FC<PasswordInputProps>;

  export default PasswordInput;
}
