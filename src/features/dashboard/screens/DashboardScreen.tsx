import { signOut } from "@/src/features/auth/api/signOut";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = () => {
  const router = useRouter();

  async function tapOnLogout() {
    await signOut();
    router.replace("/");
  }

  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <TouchableOpacity onPress={tapOnLogout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
