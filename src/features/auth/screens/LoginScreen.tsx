import useLoginScreen from "@/src/features/auth/hooks/useLoginScreen";
import Button from "@/src/shared/components/Button";
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
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
      />

      <Button title={"Se connecter"} onPress={tapOnLogin} />

      <TouchableOpacity onPress={tapOnSignUp} className="p-4 items-center">
        <Text className="font-medium">Créer un compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
