import React from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};

const FormInput = ({ label, value, error, onChangeText }: Props) => {
  return (
    <View>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
      />
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
};

export default FormInput;
