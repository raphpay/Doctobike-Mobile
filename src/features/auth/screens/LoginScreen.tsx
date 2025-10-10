import useLoginScreen from "@/src/features/auth/hooks/useLoginScreen";
import { Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const {
    email,
    password,
    isSecure,
    setEmail,
    setPassword,
    setIsSecure,
    tapOnLogin,
    tapOnSignUp,
  } = useLoginScreen();

  return (
    <SafeAreaView className="flex flex-1 gap-4 p-4">
      <Text className="text-3xl font-semibold text-center">Doctobike</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
      />

      <TouchableOpacity
        onPress={tapOnLogin}
        className="p-4 bg-primary items-center rounded-xl"
      >
        <Text className="font-medium">Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={tapOnSignUp} className="p-4 items-center">
        <Text className="font-medium">Créer un compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
