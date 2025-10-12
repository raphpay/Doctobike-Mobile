import useSignUpScreen from "@/src/features/auth/hooks/useSignUpScreen";
import Button from "@/src/shared/components/Button";
import SecureTextInput from "@/src/shared/components/SecureTextInput";
import React from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {
  const {
    shopCode,
    email,
    password,
    setShopCode,
    setEmail,
    setPassword,
    tapOnSubmit,
  } = useSignUpScreen();

  return (
    <SafeAreaView className="p-4">
      <Text>SignUpScreen</Text>
      <TextInput
        label="Code magasin"
        value={shopCode}
        onChangeText={setShopCode}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <SecureTextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
      />
      <Button title={"Créer un compte"} onPress={tapOnSubmit} />
    </SafeAreaView>
  );
};

export default SignUpScreen;
