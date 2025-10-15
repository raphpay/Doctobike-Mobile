import useDashboardScreen from "@/src/features/dashboard/hooks/useDashboardScreen";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen = () => {
  const { tapOnSeeBikes, tapOnCreateBike, tapOnLogout } = useDashboardScreen();

  return (
    <SafeAreaView>
      <Text>DashboardScreen</Text>
      <TouchableOpacity onPress={tapOnSeeBikes}>
        <Text>Voir mes vélos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={tapOnCreateBike}>
        <Text>Ajouter un vélo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={tapOnLogout}>
        <Text>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashboardScreen;
