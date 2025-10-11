import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-4 bg-primary items-center rounded-xl"
    >
      <Text className="font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
