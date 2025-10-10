import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { TextInput } from "react-native-paper";

export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSecure, setIsSecure] = useState<boolean>(false);

  function login() {
    console.log("login");
  }

  function goToSignUp() {
    console.log("signup");
  }

  return (
    <View className="flex flex-1 justify-center items-center gap-4">
      <Text className="text-primary">
        Edit app/index.tsx to edit this screen.
      </Text>
      <View className="flex flex-col gap-4">
        <TextInput
          label={"Email"}
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          outlineColor="blue"
          selectionColor="green"
          activeOutlineColor="black"
        />
        <TextInput
          label={"Mot de passe"}
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          outlineColor="blue"
          selectionColor="green"
          activeOutlineColor="black"
          secureTextEntry={isSecure}
          right={
            <TextInput.Icon
              icon={isSecure ? "eye" : "eye-off"}
              onPress={() => setIsSecure(!isSecure)}
            />
          }
        />
      </View>

      <TouchableOpacity
        className="py-2 px-4 bg-primary items-center rounded-lg hover:bg-blue-700 transition"
        onPress={login}
      >
        <Text className="text-white">Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity className="py-2 px-4 items-center" onPress={goToSignUp}>
        <Text className="text-black hover:text-gray-400 transition">
          Créer un compte
        </Text>
      </TouchableOpacity>
    </View>
  );
}
