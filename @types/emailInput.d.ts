declare module "../background/inputs/emailInput" {
  import * as React from "react";
  import { TextInputProps } from "react-native";

  export interface EmailInputProps extends TextInputProps {
    value: string;
  }

  const EmailInput: React.FC<EmailInputProps>;

  export default EmailInput;
}
