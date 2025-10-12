import React, { useState } from "react";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SecureTextInput = ({ label, value, onChangeText }: Props) => {
  const [isSecure, setIsSecure] = useState<boolean>(true);

  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      secureTextEntry={isSecure}
      right={
        <TextInput.Icon
          icon={isSecure ? "eye-closed" : "eye"}
          onPress={() => setIsSecure(!isSecure)}
        />
      }
    />
  );
};

export default SecureTextInput;
