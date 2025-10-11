import { signOut } from "@/src/features/auth/api/signOut";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const DashboardScreen = (props: Props) => {
  async function tapOnLogout() {
    await signOut();
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
